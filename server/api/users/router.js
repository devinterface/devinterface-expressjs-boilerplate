import * as express from 'express'
import controller from './controller'
import auth from '../../middlewares/auth'

export default express
  .Router()
  .get('/', auth.ensureApiAuthenticated, controller.all)
  .get('/:id', auth.ensureApiAuthenticated, controller.byId)
