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
      this.belongsTo(models.productModel);
      this.hasMany(models.itemStatusHistory);
    }
  };
  StockItem.init({
    status: DataTypes.STRING,
    isReadyToBeRented: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'stockItem',
  }); 
  return StockItem;
};