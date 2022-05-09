const { Router } = require("express");
const {
  createUser,
  findOneUser,
  findAllUser,
  updateUser,
  deleteUser,
  logUser,
  signoutUser,
  secretRoute,
} = require("../controllers/userControllers.js");

const createUserRouter = Router();
const findOneUserRouter = Router();
const findAllUserRouter = Router();
const updateUserRouter = Router();
const deleteUserRouter = Router();
const loginUserRouter = Router();
const secreteUserRouter = Router();
const signoutUserRouter = Router();

createUserRouter.post("/user", createUser);
findOneUserRouter.get("/getusers/:uuid", findOneUser);
findAllUserRouter.get("/getusers", findAllUser);
updateUserRouter.put("/getusers/:uuid", updateUser);
deleteUserRouter.delete("/getusers/:uuid", deleteUser);
loginUserRouter.post("/login", logUser);
secreteUserRouter.get("/secret", secretRoute, (req, res) => {
  res.json({ message: "can access this page", user: req.user });
});
signoutUserRouter.get("/signout", signoutUser);

module.exports = {
  loginUserRouter,
  createUserRouter,
  findOneUserRouter,
  findAllUserRouter,
  updateUserRouter,
  deleteUserRouter,
  secreteUserRouter,
  signoutUserRouter,
};
