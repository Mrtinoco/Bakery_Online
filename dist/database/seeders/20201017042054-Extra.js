'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Extras',
      [
        {
          name: 'Queso amarillo',
          price: '8',
          imageurl: '1.jpg',
        },
        {
          name: 'Mantequilla',
          price: '8',
          imageurl: '8.jpg',
        },
        {
          name: 'Mantequilla de mani',
          price: '8',
          imageurl: '3.jpg',
        },
        {
          name: 'Jamón',
          price: '8',
          imageurl: '4.jpg',
        },
        {
          name: 'Huevo Cocido',
          price: '8',
          imageurl: '5.jpg',
        },
        {
          name: 'Trozo de frutas: Fresa',
          price: '8',
          imageurl: '6.jpg',
        },
        {
          name: 'Trozo de frutas: Manzana',
          price: '8',
          imageurl: '7.jpg',
        },
          {
              name: 'Ninguno',
              price: '0',
              imageurl: '8.jpg',
          },

      ],
      {},
  ),


  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Extras', null, {}
  ),
};
