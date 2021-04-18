'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemStatusHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.StockItem);
    }
  };
  ItemStatusHistory.init({
    status: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ItemStatusHistory',
    updatedAt: false
  });
  return ItemStatusHistory;
};