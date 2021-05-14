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
      this.hasMany(models.itemRental);
      this.hasMany(models.additive);
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
    paymentType: DataTypes.STRING,
    contractNumber: DataTypes.STRING,
    invoiceNumber: DataTypes.STRING,
    value: {
      type: DataTypes.DECIMAL(10, 2),
      get() {
        const value = this.getDataValue('value');
        return value === null ? null : parseFloat(value);
      }
    },
    status: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'rentContract',
  });
  return RentContract;
};