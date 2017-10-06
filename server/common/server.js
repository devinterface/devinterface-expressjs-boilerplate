import Express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as os from 'os'
import cookieParser from 'cookie-parser'
import l from './logger'
import compression from 'compression'
import expressValidator from 'express-validator'
import session from 'express-session'
import passport from 'passport'
import sassMiddleware from 'node-sass-middleware'
import flash from 'express-flash-2'
// Passport OAuth strategies
require('./passport')

const app = new Express()

export default class ExpressServer {
  constructor () {
    const root = path.normalize(`${__dirname}/../..`)
    app.set('appPath', `${root}client`)
    app.set('views', path.join(root, 'views'))
    app.set('view engine', 'pug')
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(expressValidator())
    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(sassMiddleware({
      src: path.join(__dirname, 'public'),
      dest: path.join(__dirname, 'public'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true
    }))
    app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use(function (req, res, next) {
      res.locals.user = req.user ? req.user.toJSON() : null
      next()
    })
    app.use(Express.static(`${root}/public`))
  }

  router (routes) {
    routes(app)
    return this
  }

  listen (port = process.env.PORT) {
    const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`)
    http.createServer(app).listen(port, welcome(port))
    return app
  }
}
