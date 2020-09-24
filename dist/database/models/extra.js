'use strict';
module.exports = (sequelize, DataTypes) => {
  const Extra = sequelize.define('Extra', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageurl: DataTypes.STRING
  }, {});
  Extra.associate = function(models) {
    // associations can be defined here
    Extra.hasMany(models.Order, {
      foreignKey: 'extraId',
      as: 'extra',
      onDelete: 'CASCADE'
    });
  };
  return Extra;
};