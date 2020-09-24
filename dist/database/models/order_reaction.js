'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_reaction = sequelize.define('Order_reaction', {
    orderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Order_reaction.associate = function(models) {
    // associations can be defined here
    Order_reaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'buyer'
    });
    Order_reaction.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    });
  };
  return Order_reaction;
};