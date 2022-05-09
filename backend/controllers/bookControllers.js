const { sequelize, Book, User, Status } = require("../models");

//librarian add books

const addBook = async (req, res) => {
  const { bname, bauthor, bcategory, bdescription, bquantity } = req.body;

  try {
    const check = await Book.findOne({
      where: {
        bname: bname,
        bauthor: bauthor,
      },
    });
    if (check)
      res.status(500).json({
        success: false,
        message: "Book Existed",
      });
    const newbook = await Book.create({
      bname,
      bauthor,
      bdescription,
      bcategory,
    });

    //create the status table

    const bstatus = await Status.create({
      bookId: newbook.id,
      bname: bname,
      bquantity: bquantity,
    });

    return res.status(200).json({ newbook, bstatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//find all books

const findAllBooks = async (req, res) => {
  try {
    const allbooks = await Book.findAll({
      include: "hasstatus",
    });

    return res.status(200).json({ allbooks });
  } catch (error) {
    return res.status(500).json(error.errors[0].message);
  }
};

//findOne book
const findOneBook = async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const oneBook = await Book.findOne({
      where: {
        uuid,
      },
    });

    return res.status(200).json({ oneBook });
  } catch (error) {
    return res.status(500).json(error.errors[0].message);
  }
};

//update book

const updateBook = async (req, res) => {
  const uuid = req.params.uuid;
  const { bname, bauthor, bdescription, bcategory, bquantity } = req.body;

  try {
    const updatedBook = await Book.findOne({
      where: {
        uuid,
      },
    });

    const bookstatus = await Status.findOne({
      where: {
        bookId: updatedBook.id,
      },
    });

    if (bquantity) {
      bookstatus.bquantity = bquantity;
      await bookstatus.save();
    }

    if (bname) {
      updatedBook.bname = bname;
    }
    if (bauthor) {
      updatedBook.bauthor = bauthor;
    }
    if (bcategory) {
      updatedBook.bcategory = bcategory;
    }
    if (bdescription) {
      updatedBook.bdescription = bdescription;
    }

    await updatedBook.save();

    return res.status(500).json({ updatedBook, bookstatus });
  } catch (error) {
    return res.status(500).json(error.errors[0].message);
  }
};

//delete book

const deleteBook = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const deletedBook = await Book.findOne({
      where: { uuid },
    });

    const status = await Status.findOne({
      where: { bookId: deletedBook.id },
    });

    await deletedBook.destroy();
    await status.destroy();

    return res.status(500).json("book deleted successfully");
  } catch (error) {
    return res.status(500).json(error.errors[0].message);
  }
};
module.exports = {
  addBook,
  findAllBooks,
  findOneBook,
  updateBook,
  deleteBook,
};
