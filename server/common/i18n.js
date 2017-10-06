import i18n from 'i18n'
import * as path from 'path'

const root = path.normalize(`${__dirname}/../..`)
i18n.configure({
  locales: ['en', 'it'],
  directory: path.join(root, 'locales'),
  fallbacks: {'it': 'en'},
  defaultLocale: 'en'
})

module.exports = i18n
