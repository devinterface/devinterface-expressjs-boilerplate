'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passwordDigest: Sequelize.STRING,
      passwordResetToken: Sequelize.DATE,
      passwordResetExpires: Sequelize.DATE,
      name: Sequelize.STRING,
      gender: Sequelize.STRING,
      location: Sequelize.STRING,
      website: Sequelize.STRING,
      picture: Sequelize.STRING,
      facebook: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
