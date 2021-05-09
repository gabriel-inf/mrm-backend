'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Additive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.rentContract);
    }
  };

  Additive.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    approvalDate: DataTypes.DATE,
    paymentDueDate: DataTypes.DATE,
    paidAt: DataTypes.DATE,
    receiptUrl: DataTypes.STRING,
    contractUrl: DataTypes.STRING,
    value: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'additive',
  });
  return Additive;
};