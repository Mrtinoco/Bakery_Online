'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    breadId: DataTypes.INTEGER,
    rellenoId: DataTypes.INTEGER,
    extraId: DataTypes.INTEGER,
    glutenId: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
    status: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.hasMany(models.Order_reaction, {
      foreignKey: 'orderId',
      as: 'reactions',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'buyer',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Bread, {
      foreignKey: 'breadId',
      as: 'bread',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Relleno, {
      foreignKey: 'rellenoId',
      as: 'relleno',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Extra, {
      foreignKey: 'extraId',
      as: 'extra',
      onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Gluten, {
      foreignKey: 'glutenId',
      as: 'gluten',
      onDelete: 'CASCADE'
    });
  };
  return Order;
};