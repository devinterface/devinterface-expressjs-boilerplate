// API ROUTES
import examplesApiRouter from './api/examples/router'
import usersApiRouter from './api/users/router'

// APP ROUTES
import publicAppRouter from './app/public/router'
import accountAppRouter from './app/account/router'
import usersAppRouter from './app/users/router'

import I18n from './middlewares/i18n'

export default function routes (app) {
  // API ROUTES
  app.use('/api/v1/examples', examplesApiRouter)
  app.use('/api/v1/users', usersApiRouter)

  // APP ROUTES
  app.use('/:lang/', I18n.setLocale, publicAppRouter)
  app.use('/:lang/', I18n.setLocale, accountAppRouter)
  app.use('/:lang/users', I18n.setLocale, usersAppRouter)
}
