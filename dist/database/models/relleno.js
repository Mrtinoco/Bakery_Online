'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relleno = sequelize.define('Relleno', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageurl: DataTypes.STRING
  }, {});
  Relleno.associate = function(models) {
    // associations can be defined here
    Relleno.hasMany(models.Order, {
      foreignKey: 'rellenoId',
      as: 'relleno',
      onDelete: 'CASCADE'
    });
  };
  return Relleno;
};