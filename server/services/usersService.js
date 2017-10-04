import l from '../common/logger'
import User from '../models/User'

class UsersService {
  async all () {
    l.info(`${this.constructor.name}.all()`)
    let users = await User.query((qb) => {
      qb.orderBy('created_at', 'DESC')
    }).fetchAll()
    return users
  }

  async byId (id) {
    l.info(`${this.constructor.name}.byId(${id})`)
    let user = await new User({
      id: id
    }).fetch()
    return user
  }
}

export default new UsersService()
