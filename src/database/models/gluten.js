'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gluten = sequelize.define('Gluten', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageurl: DataTypes.STRING
  }, {});
  Gluten.associate = function(models) {
    // associations can be defined here
    Gluten.hasMany(models.Order, {
      foreignKey: 'glutenId',
      as: 'gluten',
      onDelete: 'CASCADE'
    });
  };
  return Gluten;
};