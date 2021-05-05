'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productModelName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productModelName.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'productModelName',
  });
  return productModelName;
};