import UsersService from '../../services/usersService'
import passport from 'passport'

export class Controller {
  async loginGet (req, res) {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('account/login', {
      title: 'Log in',
      errors: req.session.error
    })
  }

  async loginPost (req, res, next) {
    req.assert('email', 'Email non valida').isEmail()
    req.assert('email', 'Inserire una Email').notEmpty()
    req.assert('password', 'Inserire una password').notEmpty()
    req.sanitize('email').normalizeEmail({
      remove_dots: false
    })

    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      req.session.error = errors.array()
      return res.redirect('/login')
    }

    passport.authenticate('local', (err, user, info) => {
      if (!user) {
        req.session.error = [info]
        return res.redirect('/login')
      }
      req.logIn(user, () => {
        res.redirect('/')
      })
    })(req, res, next)
  }

  async signupGet (req, res) {
    let users = await UsersService.all()
    res.render('users/index', {
      title: 'Users',
      users: users.toJSON()
    })
  }

  async signupPost (req, res) {
    let user = await UsersService.byId(req.params.id)
    res.render('users/show', {
      title: 'User detail',
      user: user.toJSON()
    })
  }
}

export default new Controller()
