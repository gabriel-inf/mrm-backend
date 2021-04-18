'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ProductModel);
    }
  };
  StockItem.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StockItem',
  }); 
  return StockItem;
};