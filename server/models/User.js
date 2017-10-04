let crypto = require('crypto')
let bcrypt = require('bcrypt-nodejs')
let bookshelf = require('../common/bookshelf')

let User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function () {
    this.on('saving', this.hashPassword, this)
  },

  hashPassword: function (model, attrs, options) {
    let password = options.patch ? attrs.password : model.get('password')
    if (!password) {
      return
    }
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (options.patch) {
            attrs.password = hash
          }
          model.set('password', hash)
          resolve()
        })
      })
    })
  },

  comparePassword: function (password, done) {
    let model = this
    bcrypt.compare(password, model.get('password'), (err, isMatch) => {
      done(err, isMatch)
    })
  },

  hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],

  virtuals: {
    gravatar: function () {
      if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?s=200&d=retro'
      }
      let md5 = crypto.createHash('md5').update(this.get('email')).digest('hex')
      return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro'
    }
  }
})

module.exports = User
