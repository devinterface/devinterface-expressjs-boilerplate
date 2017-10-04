import examplesApiRouter from './api/examples/router'
import publicAppRouter from './app/public/router'

export default function routes (app) {
  app.use('/api/v1/examples', examplesApiRouter)
  app.use('/', publicAppRouter)
}
