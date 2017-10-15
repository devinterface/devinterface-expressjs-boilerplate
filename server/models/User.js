import {Sequelize, DataTypes} from 'sequelize'
import sequelize from '../common/sequelize'
import bcrypt from 'bcrypt'

const User = sequelize.define('users', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  role: {
    type: Sequelize.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isEmail: true}
  },
  passwordDigest: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.VIRTUAL
  },
  password_confirmation: {
    type: Sequelize.VIRTUAL
  },
  passwordResetToken: {
    type: Sequelize.STRING
  },
  passwordResetExpires: {
    type: Sequelize.DATE
  },
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
  facebook: {
    type: Sequelize.STRING
  }
},
  {
    indexes: [{unique: true, fields: ['email']}]
  }
)
const hasSecurePassword = async (user) => {
  if (user.password) {
    const hash = await bcrypt.hash(user.password, 10)
    user.set('passwordDigest', hash)
  } else { }
}

User.prototype.authenticate = function (value) {
  return bcrypt.compareSync(value, this.passwordDigest)
}

User.beforeSave(async user => {
  user.email = user.email.toLowerCase()
  await hasSecurePassword(user)
})

module.exports = User
