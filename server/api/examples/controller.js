import ExamplesService from './service'

export class Controller {
  async all (req, res) {
    let r = await ExamplesService.all()
    res.json(r)
  }

  async byId (req, res) {
    let r = await ExamplesService.byId(req.params.id)
    if (r) res.json(r)
    else res.status(404).end()
  }

  async create (req, res) {
    let r = await ExamplesService.create(req.body.name)
    res.status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r)
  }
}
export default new Controller()
