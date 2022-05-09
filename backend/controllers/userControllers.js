const { sequelize, User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const env = require("dotenv").config();
const cookie = require("cookie-parser");

//create new user controller

const createUser = async (req, res) => {
  const { username, email, role, password } = req.body;
  try {
    if (!password) {
      res.json({ message: "password cannot be empty" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const user = await User.create({
          username,
          email,
          role,
          password: hash,
        });

        return res.status(200).json({ user: user });
      } catch (error) {
        if (error.errors[0].type === "unique violation") {
          const check = error.errors[0].path;
          switch (check) {
            case "users.username":
              res.status(500).json({ message: "username already taken" });
              break;
            case "users.email":
              res.status(500).json({ message: "email already exist" });
              break;
            default:
              console.log("random unexpected error at unique field");
          }
        }
        return res.status(500).json({ message: error.errors[0].message });
      }
    });
  } catch (err) {
    return res.status(500).json({ Error: "cannot create user" });
  }
};

//findOne use controller
const findOneUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const oneuser = await User.findOne({
      where: { uuid },
    });

    return res.json({ oneuser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//findAll users controller
const findAllUser = async (req, res) => {
  try {
    const allusers = await User.findAll();

    return res.json({ allusers });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//update user controller
const updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const { username, email, password } = req.body;
  try {
    const updateduser = await User.findOne({
      where: { uuid },
    });

    if (username) {
      updateduser.username = username;
    }
    if (email) {
      updateduser.email = email;
    }
    if (password) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "password update failed" });
        } else {
          updateduser.password = hash;
          console.log(updateduser.password);
          updateduser.save();
        }
      });
    }
    await updateduser.save();

    return res.json({ updateduser });
  } catch (error) {
    if (error.errors[0].type === "unique violation") {
      const check = error.errors[0].path;
      switch (check) {
        case "users.username":
          res.status(500).json({ message: "username already taken" });
          break;
        case "users.email":
          res.status(500).json({ message: "email already exist" });
          break;
        default:
          console.log("random unexpected error at unique field");
      }
    }
    return res.status(500).json({ message: error.errors[0].message });
  }
};

//delete user controller
const deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const deleteuser = await User.findOne({
      where: { uuid },
    });
    const username = deleteuser.username;
    await deleteuser.destroy();

    return res.json({
      message: `user ${username}'s account hasbeen deleted successfully `,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//login user

const logUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const nuser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (bcrypt.compareSync(password, nuser.password)) {
      //send token
      const token = jwt.sign({ _id: nuser.id }, process.env.jwtsecret, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        expiresIn: "1d",
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).json({ token: token, user: nuser });
    } else {
      res.json({ message: "incorrect username or password" });
    }
  } catch (error) {
    return res.status(500).json({ error: "user does not exist" });
  }
};
//signout
const signoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "user signout" });
};
//secret page
const secretRoute = expressJwt({
  secret: process.env.jwtsecret,
  algorithms: ["HS256"],
});
//requireSignin

module.exports = {
  createUser,
  findOneUser,
  findAllUser,
  updateUser,
  deleteUser,
  logUser,
  signoutUser,
  secretRoute,
};
