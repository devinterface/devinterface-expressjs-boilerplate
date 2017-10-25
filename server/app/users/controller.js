import UsersService from '../../services/usersService'
import cancan from '../../common/authorization'
import {url} from '../../common/urlBuilder'

class Controller {
  async all (req, res) {
    let users = await UsersService.all()
    res.render('users/index', {
      title: 'Users',
      users: users
    })
  }

  async byId (req, res) {
    let user = await UsersService.byId(req.params.id)
    try {
      cancan.authorize(req.user, 'show', user)
    } catch (err) {
      return res.redirect(url(req, '/'))
    }
    res.render('users/show', {
      title: 'User detail',
      user: user
    })
  }
}
export default new Controller()
