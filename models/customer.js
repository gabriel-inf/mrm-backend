'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Address, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: true
        }
      });
    }
  };

  Customer.init({
    companyName: DataTypes.STRING,
    commercialName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    mobilePhoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};