import passport from 'passport'
import User from '../../models/User'

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
    req.check('email').notEmpty().isEmail().withMessage('must be an email').trim().normalizeEmail({remove_dots: false})
    req.check('password').notEmpty().withMessage('please insert a password')
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
    if (req.user) {
      return res.redirect('/')
    }
    res.render('account/signup', {
      title: 'Signup',
      errors: req.session.error
    })
  }

  async signupPost (req, res, next) {
    req.check('email', 'Email is not valid').isEmail()
    req.check('email', 'Email cannot be blank').notEmpty()
    req.check('password', 'Password must be at least 8 characters long').len(8)
    req.sanitize('email').normalizeEmail({
      remove_dots: false
    })
    const errors = await req.getValidationResult()
    if (!errors.isEmpty()) {
      req.session.error = errors.array()
      return res.redirect('/signup')
    }

    let user = new User({
      email: req.body.email,
      password: req.body.password
    })
    try {
      await user.save()
      req.logIn(user, () => {
        res.redirect('/')
      })
    } catch (err) {
      console.log(err)
      res.redirect('/signup')
    }
  }
}

export default new Controller()
