// API ROUTES
import examplesApiRouter from './api/examples/router'
import usersApiRouter from './api/users/router'

// APP ROUTES
import publicAppRouter from './app/public/router'
import accountAppRouter from './app/account/router'
import usersAppRouter from './app/users/router'

export default function routes (app) {
  // API ROUTES
  app.use('/api/v1/examples', examplesApiRouter)
  app.use('/api/v1/users', usersApiRouter)

  // APP ROUTES
  app.use('/', publicAppRouter)
  app.use('/', accountAppRouter)
  app.use('/users', usersAppRouter)
}
