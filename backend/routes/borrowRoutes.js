const { Router } = require("express");

const {
  borrowBook,
  returnBook,
} = require("../controllers/borrowBookControllers");

const borrowBookRouter = Router();
const returnBookRouter = Router();

borrowBookRouter.post("/borrowbook/:uuid", borrowBook);
returnBookRouter.delete("/returnbook", returnBook);

module.exports = {
  borrowBookRouter,
  returnBookRouter,
};
