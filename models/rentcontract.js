'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.customer);
      this.hasMany(models.itemRental)
    }
  };

  RentContract.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    approvalDate: DataTypes.DATE,
    paymentDueDate: DataTypes.DATE,
    paidAt: DataTypes.DATE,
    receiptUrl: DataTypes.STRING,
    contractUrl: DataTypes.STRING,
    durationMode: DataTypes.STRING,
    value: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'rentContract',
  });
  return RentContract;
};