import l from '../common/logger'
import User from '../models/User'

class UsersService {
  async all () {
    l.info(`${this.constructor.name}.all()`)
    let users = await User.findAll({})
    return users
  }

  async byId (id) {
    l.info(`${this.constructor.name}.byId(${id})`)
    let user = await User.findById(id)
    return user
  }
}

export default new UsersService()
