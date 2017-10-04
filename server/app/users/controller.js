import UsersService from './service'

export class Controller {
  async all (req, res) {
    let users = await UsersService.all()
    res.render('users/index', {
      title: 'Users',
      users: users.toJSON()
    })
  }

  async byId (req, res) {
    let user = await UsersService.byId(req.params.id)
    res.render('users/show', {
      title: 'User detail',
      user: user.toJSON()
    })
  }
}
export default new Controller()
