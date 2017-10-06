import passport from 'passport'
import transporter from '../../common/transporter'
import User from '../../models/User'
import pug from 'pug'
import crypto from 'crypto-promise'

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

  async logout (req, res) {
    req.logout()
    res.redirect('/')
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

  /**
   * GET /forgot
   */
  async forgotGet (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    res.render('account/forgot', {
      errors: req.session.error,
      title: 'Forgot Password'
    })
  }

/**
 * POST /forgot
 */
  async forgotPost (req, res, next) {
    req.check('email', 'Email non valida').isEmail()
    req.check('email', 'Inserire un\'email').notEmpty()
    req.sanitize('email').normalizeEmail({
      remove_dots: false
    })

    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      req.session.error = errors.array()
      return res.redirect('/forgot')
    }
    const buf = await crypto.randomBytes(16)
    const token = buf.toString('hex')
    let user = await new User({
      email: req.body.email
    }).fetch()

    if (!user) {
      req.session.error = [{
        msg: 'L\'indirizzo ' + req.body.email + ' non è associato ad alcun account.'
      }]
      return res.redirect('/forgot')
    }
    user.set('passwordResetToken', token)
    user.set('passwordResetExpires', new Date(Date.now() + 3600000)) // expire in 1 hour
    await user.save(user.changed, {
      patch: true
    })
    let emailText = pug.renderFile('views/mailer/modify_password.pug', {
      host: req.headers.host,
      token: token
    })
    const mailOptions = {
      to: user.toJSON().email,
      from: process.env.DEFAULT_EMAIL_FROM,
      subject: 'Reset della password',
      html: emailText
    }
    transporter.sendMail(mailOptions, () => {
      req.session.error = [{
        msg: 'E\' stata spedita un\'email a ' + user.attributes.email + ' con ulteriori istruzioni.'
      }]
      res.redirect('/forgot')
    })
  }

/**
 * GET /reset
 */
  async resetGet (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    let user = new User({
      passwordResetToken: req.params.token
    })
    await user.where('passwordResetExpires', '>', new Date()).fetch()

    if (!user) {
      req.session.error = [{
        msg: 'Token scaduto o invalido.'
      }]
      return res.redirect('/forgot')
    }
    res.render('account/reset', {
      errors: req.session.error,
      title: 'Password Reset'
    })
  }

/**
 * POST /reset
 */
  async resetPost (req, res, next) {
    req.check('password', 'Password must be at least 4 characters long').len(4)
    req.check('confirm', 'Passwords must match').equals(req.body.password)

    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      req.session.error = errors.array()
      return res.redirect('/reset/' + req.params.token)
    }

    let user = new User({
      passwordResetToken: req.params.token
    })
    user = await user.where('passwordResetExpires', '>', new Date()).fetch()

    if (!user) {
      req.session.error = [{
        msg: 'Token scaduto o invalido.'
      }]
      return res.redirect('back')
    }
    user.set('password', req.body.password)
    user.set('passwordResetToken', null)
    user.set('passwordResetExpires', null)
    await user.save(user.changed, {
      patch: true
    })
    await req.logIn(user, () => {
      Promise.resolve(user)
    })

    const userJson = user.toJSON()
    let emailText = pug.renderFile('views/mailer/confirm_modify_password.pug', {
      email: userJson.email
    })
    const mailOptions = {
      from: process.env.DEFAULT_EMAIL_FROM,
      to: userJson.email,
      subject: 'Conferma modifica password',
      html: emailText
    }
    transporter.sendMail(mailOptions, () => {
      req.session.error = [{
        msg: 'La tua password è stata modificata con successo!'
      }]
      res.redirect('/account')
    })
  }
}

export default new Controller()
