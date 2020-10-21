'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Bread',
      [
        {
          name: 'Pico',
          price: '8',
          imageurl: '1.jpg',
        },
        {
          name: 'Pudin',
          price: '8',
          imageurl: '8.jpg',
        },
        {
          name: 'Dona',
          price: '8',
          imageurl: '3.jpg',
        },
        {
          name: 'Bollo',
          price: '8',
          imageurl: '4.jpg',
        },
        {
          name: 'Churro',
          price: '8',
          imageurl: '5.jpg',
        },
        {
          name: 'Croissant',
          price: '8',
          imageurl: '6.jpg',
        },
        {
          name: 'Semita',
          price: '8',
          imageurl: '7.jpg',
        },
        {
          name: 'Torta',
          price: '8',
          imageurl: '8.jpg',
        },
      ],
      {},
  ),


  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Bread', null, {}
  ),
};

