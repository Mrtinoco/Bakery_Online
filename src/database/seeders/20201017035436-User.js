'use strict';
require('dotenv').config()

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
      [
        {
          email: 'tinocomarcos21@gmail.com',
          first_name: "Marcos",
          last_name: "Tinoco",
          username: 'admin',
          address: 'Nagarote, Leon',
          role: 1,
          password: '$2b$10$GOZ.P2psNfVxBeztuq7hQePY.wcYxiY2MYTijvhqZ03WDXIvDeLVW',
          createdAt: new Date(),
        },
        {
          email: 'usuariodeejemplo@gmail.com',
          username: 'fer98',
          first_name: "Fernando",
          last_name: "Morales",
          address: 'Barrio Acahualinca',
          role: 0,
          password: '$2y$12$gRbpueBeZ1r9D.k1xLx4w.7HgDsymSnmhHXBhDBcPJHo5tVEe6Ux2',
          createdAt: new Date(),
        },

      ],
      {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Users', null, {}
  ),
};
