import examplesApiRouter from './api/controllers/examples/router'
import publicAppRouter from './app/controllers/public/router'

export default function routes (app) {
  app.use('/api/v1/examples', examplesApiRouter)
  app.use('/', publicAppRouter)
}
