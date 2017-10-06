import * as express from 'express'
import controller from './controller'
import authentication from '../../middlewares/authentication'

export default express
  .Router()
  .get('/', authentication.ensureApiAuthenticated, controller.all)
  .get('/:id', authentication.ensureApiAuthenticated, controller.byId)
