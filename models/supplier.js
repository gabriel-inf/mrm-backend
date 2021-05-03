'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      this.hasOne(models.address, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: true
        }
      });
    }
  };

  Supplier.init({
    companyName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    mobilePhoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};