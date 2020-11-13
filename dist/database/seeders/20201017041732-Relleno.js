'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Rellenos',
      [
        {
          name: 'Chocolate',
          price: '8',
          imageurl: '1.jpg',
        },
        {
          name: 'Vainilla',
          price: '8',
          imageurl: '8.jpg',
        },
        {
          name: 'Nutella',
          price: '8',
          imageurl: '3.jpg',
        },
        {
          name: 'Jalea de Guayaba',
          price: '8',
          imageurl: '4.jpg',
        },
        {
          name: 'Fresa',
          price: '8',
          imageurl: '5.jpg',
        },
        {
          name: 'Jalea de Piña',
          price: '8',
          imageurl: '6.jpg',
        },
        {
          name: 'Leche condensada',
          price: '8',
          imageurl: '7.jpg',
        },
      ],
      {},
  ),


  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Rellenos', null, {}
  ),
};

