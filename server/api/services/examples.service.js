import l from '../../common/logger'
import db from './examples.db.service'

class ExamplesService {
  async all () {
    l.info(`${this.constructor.name}.all()`)
    return db.all()
  }

  async byId (id) {
    l.info(`${this.constructor.name}.byId(${id})`)
    return db.byId(id)
  }

  async create (name) {
    return db.insert(name)
  }
}

export default new ExamplesService()
