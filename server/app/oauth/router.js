import * as express from 'express'
import controller from './controller'
import authentication from '../../middlewares/authentication'
import passport from 'passport'

export default express
  .Router()
  .get('/facebook/unlink', authentication.ensureAuthenticated, controller.unlink)
  .post('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
  .get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/en/login' }))
