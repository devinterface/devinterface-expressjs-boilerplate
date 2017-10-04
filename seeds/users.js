
const User = require('../server/models/User')
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async() => {
      let user = new User({
        email: 'info@devinterface.com',
        password: 'password',
        role: 0
      })
      await user.save()
    })
}
