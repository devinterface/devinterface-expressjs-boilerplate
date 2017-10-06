import * as express from 'express'
import controller from './controller'

export default express
  .Router()
  .get('/login', controller.loginGet)
  .post('/login', controller.loginPost)
  .get('/logout', controller.logout)
  .get('/signup', controller.signupGet)
  .post('/signup', controller.signupPost)
  .get('/forgot', controller.forgotGet)
  .post('/forgot', controller.forgotPost)
  .get('/reset/:token', controller.resetGet)
  .post('/reset/:token', controller.resetPost)
