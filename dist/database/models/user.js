'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    password: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function get() {
        return "".concat(this.first_name, " ").concat(this.last_name);
      },
      set: function set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Order_reaction, {
      foreignKey: 'userId',
      as: 'order_reactions',
      onDelete: 'CASCADE'
    });
  };
  return User;
};