"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Borrowbook }) {
      // define association here
      this.hasMany(Borrowbook, {
        foreignKey: "userId",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "user name cannot be null",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email cannot be empty",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          isEmail: {
            msg: "please insert valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be null",
          },
          notEmpty: {
            msg: "password cannot be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "role cannot be empty",
          },
          notEmpty: {
            msg: "role cannot be empty",
          },
        },
      },
    },
    {
      tableName: "users",
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
