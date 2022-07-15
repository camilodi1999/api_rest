const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequilize");

class User extends Model { }

/**
 * Creates the User model 
 * attributes: name, phone, age, email, password
 * the email must be unique
 * */
User.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: {
          msg: "It is not a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
  },
);

User.sync()

module.exports = User;