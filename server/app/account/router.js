import * as express from 'express'
import controller from './controller'

export default express
  .Router()
  .get('/login', controller.loginGet)
  .post('/login', controller.loginPost)
  .get('/signup', controller.signupGet)
  .post('/signup', controller.signupPost)
