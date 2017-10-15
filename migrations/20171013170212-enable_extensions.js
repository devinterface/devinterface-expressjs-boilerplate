'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public')
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public')
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "postgis" schema public')
  },

  down: (queryInterface, Sequelize) => {
  }
}
