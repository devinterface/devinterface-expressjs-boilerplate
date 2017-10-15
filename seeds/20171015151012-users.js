const uuid = require('uuid')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid.v4(),
      email: 'info@devinterface.com',
      passwordDigest: '$2a$10$pdbvH.ReqZ6LakV0H8E6FOANr7Sxqw1C0P2emDlU0th5P2Rn88m7G', // password
      role: 'user',
      createdAt: queryInterface.sequelize.literal('NOW()'),
      updatedAt: queryInterface.sequelize.literal('NOW()')
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
