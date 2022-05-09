"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Status }) {
      // define association here
      this.hasOne(Status, {
        foreignKey: "bookId",
        as: "hasstatus",
      });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  Book.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      bname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "book name cannot be null",
          },
          notEmpty: {
            msg: "book name cannot be empty",
          },
        },
      },
      bauthor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "book author cannot be null",
          },
          notEmpty: {
            msg: "book author cannot be empty",
          },
        },
      },

      // isavailable: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: {
      //       msg: "book availabele cannot be null",
      //     },
      //     notEmpty: {
      //       msg: "book availabele cannot be empty",
      //     },
      //   },
      // },

      bcategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "book category cannot be null",
          },
          notEmpty: {
            msg: "book category cannot be empty",
          },
        },
      },

      // bquantity: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notNull: {
      //       msg: "book quantity cannot be null",
      //     },
      //     notEmpty: {
      //       msg: "book name cannot be empty",
      //     },
      //   },
      // },

      bdescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description is needed",
          },
        },
      },
    },
    {
      tableName: "books",
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
