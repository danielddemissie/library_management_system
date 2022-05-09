const { sequelize, Book, User, Borrowbook, Status } = require("../models");

const borrowBook = async (req, res) => {
  const { bname, duration } = req.body;
  const uuid = req.params.uuid;
  try {
    const newuser = await User.findOne({
      where: { uuid },
    });

    const newbook = await Book.findOne({
      where: { bname },
    });

    const newstatus = await Status.findOne({
      where: {
        bookId: newbook.id,
      },
    });

    //TODO: check at quantity is 1

    //check the quantity and isavailable
    if (newstatus.bquantity > 1) {
      newstatus.bquantity = newstatus.bquantity - 1;

      const newBorrow = await Borrowbook.create({
        bname,
        duration,
        userId: newuser.id,
      });
      await newstatus.save();
      return res.status(200).json({ newBorrow });
    }
    if (newstatus.bquantity === 0) {
      newstatus.isavailable = "false";
      await newstatus.save();
      return res.json("this book is currently not available");
    }
    if (newstatus.bquantity === 1) {
      newstatus.bquantity = newstatus.bquantity - 1;
      newstatus.isavailable = "false";
      const newBorrow = await Borrowbook.create({
        bname,
        duration,
        userId: newuser.id,
      });
      await newstatus.save();
      return res.status(200).json({ newBorrow });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//TODO: return book

const returnBook = async (req, res) => {
  const { bname, username } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    const book = await Book.findOne({
      where: {
        bname: bname,
      },
    });

    //update the status

    const retunrBstatus = await Status.findOne({
      where: {
        bookId: book.id,
      },
    });
    const borrowbook = await Borrowbook.findOne({
      where: {
        userId: user.id,
        bname: bname,
      },
    });

    //update bookstatus table
    if (borrowbook.userId === user.id) {
      if (retunrBstatus.bquantity >= 1) {
        //increment status.bquantity
        retunrBstatus.bquantity = retunrBstatus.bquantity + 1;
      }
      if (retunrBstatus.bquantity === 0) {
        //increment status.bquantity
        //change the status.isavailble from false to true
        retunrBstatus.bquantity = retunrBstatus.bquantity + 1;
        retunrBstatus.isavailable = "true";
      }

      await retunrBstatus.save();
    }

    //delete the borrowbook

    await borrowbook.destroy();
    return res.status(200).json({
      success: "true",
      message: "successfully returned the borrowed book",
    });
  } catch (error) {
    return res.status(500).json("the book and the borrower does not match");
  }
};
//TODO: extend borrow time

module.exports = {
  borrowBook,
  returnBook,
};
