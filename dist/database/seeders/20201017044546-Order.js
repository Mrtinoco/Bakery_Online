'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Orders',
      [
        {
          userId: '2',
          breadId: '5',
          rellenoId: '4',
          extraId: '8',
          glutenId: '3',
          payment: '24',
        },
        {
            userId: '2',
            breadId: '6',
            rellenoId: '3',
            extraId: '4',
            glutenId: '4',
            payment: '32',
        },
        {
            userId: '2',
            breadId: '8',
            rellenoId: '7',
            extraId: '6',
            glutenId: '1',
            payment: '32',
        },

      ],
      {},
  ),


  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Orders', null, {}
  ),
};

