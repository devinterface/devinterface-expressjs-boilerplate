import * as express from 'express'
import controller from './controller'
import authentication from '../../middlewares/authentication'

export default express
  .Router()
  .get('/', authentication.ensureAuthenticated, controller.all)
  .get('/:id', authentication.ensureAuthenticated, controller.byId)
