'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.StockItem, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: true
        }
      });
    }
  };
  ProductModel.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    power: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    standardRentalValue: DataTypes.DOUBLE,
    repositionValue: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductModel',
  });
  return ProductModel;
};