import UsersService from '../../services/usersService'

export class Controller {
  async all (req, res) {
    let users = await UsersService.all()
    res.json(users)
  }

  async byId (req, res) {
    let user = await UsersService.byId(req.params.id)
    if (user) res.json(user)
    else res.status(404).end()
  }
}
export default new Controller()
