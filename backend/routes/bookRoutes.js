const { Router } = require("express");

const {
  addBook,
  findAllBooks,
  findOneBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");

const addBookRouter = Router();
const findAllBookRouter = Router();
const findOneBookRouter = Router();
const updateBookRouter = Router();
const deleteBookRouter = Router();

addBookRouter.post("/book", addBook);
findAllBookRouter.get("/getbooks", findAllBooks);
findOneBookRouter.get("/getbooks/:uuid", findOneBook);
updateBookRouter.put("/getbooks/:uuid", updateBook);
deleteBookRouter.delete("/getbooks/:uuid", deleteBook);

module.exports = {
  addBookRouter,
  findAllBookRouter,
  findOneBookRouter,
  updateBookRouter,
  deleteBookRouter,
};
