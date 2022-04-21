'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCompra extends Model {
    static associate(models) {
      ItemCompra.belongsTo(models.Compra, {foreignKey: 'CompraId', as: 'compra'});
      ItemCompra.belongsTo(models.Produto,{foreignKey: 'ProdutoId', as: 'produto'});
    }
  };
  ItemCompra.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemCompra',
  });
  return ItemCompra;
};