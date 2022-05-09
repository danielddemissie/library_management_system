const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const cookie = require("cookie-parser");

const app = express();

//use middlewares;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//import user routes
const {
  loginUserRouter,
  createUserRouter,
  findOneUserRouter,
  findAllUserRouter,
  updateUserRouter,
  deleteUserRouter,
  secreteUserRouter,
  signoutUserRouter,
} = require("./routes/userRoutes");

//import book routes

const {
  addBookRouter,
  findAllBookRouter,
  findOneBookRouter,
  updateBookRouter,
  deleteBookRouter,
} = require("./routes/bookRoutes");

//import borrow Routes

const { borrowBookRouter, returnBookRouter } = require("./routes/borrowRoutes");
//use borrow routes as middleware
app.use("/api", borrowBookRouter);
app.use("/api", returnBookRouter);
//use user route as middleware

app.use("/api", addBookRouter);
app.use("/api", findAllBookRouter);
app.use("/api", findOneBookRouter);
app.use("/api", updateBookRouter);
app.use("/api", deleteBookRouter);

//use user routes as middleware
app.use("/api", createUserRouter);
app.use("/api", secreteUserRouter);
app.use("/api", signoutUserRouter);
app.use("/api", loginUserRouter);
app.use("/api", findOneUserRouter);
app.use("/api", findAllUserRouter);
app.use("/api", updateUserRouter);
app.use("/api", deleteUserRouter);

//import the sequelize to check connection

const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");

//test connection
app.listen(process.env.PORT,  () => {
  console.log(`app runnig on port ${process.env.PORT}`);
 sequelize.authenticate().then(()=>{
   console.log("connected")
 }).catch(()=>{
   console.log("not connected")
 })

});

