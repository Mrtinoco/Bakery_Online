'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bread = sequelize.define('Bread', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageurl: DataTypes.STRING
  }, {});
  Bread.associate = function(models) {
    // associations can be defined here
    Bread.hasMany(models.Order, {
      foreignKey: 'breadId',
      as: 'bread',
      onDelete: 'CASCADE'
    });
  };
  return Bread;
};