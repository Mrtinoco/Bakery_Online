'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Glutens',
      [
        {
          name: 'Masa de trigo tradicional (Con gluten)',
          price: '8',
          imageurl: '1.jpg',
        },
        {
          name: 'Masa de trigo integral (Con gluten)',
          price: '8',
          imageurl: '8.jpg',
        },
        {
          name: 'Masa de arroz (Sin gluten)',
          price: '8',
          imageurl: '3.jpg',
        },
        {
          name: 'Masa de maíz o maicena (Sin gluten)',
          price: '8',
          imageurl: '4.jpg',
        },
      ],
      {},
  ),


  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Glutens', null, {}
  ),
};
