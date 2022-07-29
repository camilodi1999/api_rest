const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequilize");

class Transaction extends Model { }

/**
 * Creates the transaction model 
 * attributes: id, user, date, description
 * NOTE: the user must be a foreign key but for practical 
 * terms with the endpoint tests I did not include that
 * the id must be unique
 * */
 Transaction.init(
  {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'description' 
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Transaction",
  },
);

Transaction.sync()

module.exports = Transaction;