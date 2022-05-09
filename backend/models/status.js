"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book }) {
      // define association here
      this.belongsTo(Book, { foreignKey: "bookId", as: "book" });
    }
  }
  Status.init(
    {
      bquantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "book quantity cannot be null",
          },
          notEmpty: {
            msg: "book quantity cannot be empty",
          },
        },
      },
      isavailable: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "true",
        validate: {
          notNull: {
            msg: "isavailable cannot be null",
          },
          notEmpty: {
            msg: "isavailable cannot be empty",
          },
        },
      },
    },
    {
      tableName: "bookstatus",
      sequelize,
      modelName: "Status",
    }
  );
  return Status;
};
