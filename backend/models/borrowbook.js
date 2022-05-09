"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrowbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  Borrowbook.init(
    {
      bname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "book name cannot be null",
          },
          notEmpty: {
            msg: "book name cannot empty",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "duration day cannot be empty",
          },
          notNull: {
            msg: "duration day is required",
          },
        },
      },
    },
    {
      tableName: "borrowbooks",
      sequelize,
      modelName: "Borrowbook",
    }
  );
  return Borrowbook;
};
