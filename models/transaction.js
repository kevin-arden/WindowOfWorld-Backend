"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: "usersId",
      });
    }
  }
  Transaction.init(
    {
      usersId: DataTypes.INTEGER,
      accountNumber: DataTypes.STRING,
      transferProof: DataTypes.STRING,
      remainingActive: DataTypes.INTEGER,
      userStatus: DataTypes.BOOLEAN,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
