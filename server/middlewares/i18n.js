import i18n from '../common/i18n'
export class I18n {
  async setLocale (req, res, next) {
    i18n.setLocale([req, res.locals], req.params.lang)
    next()
  }
}

export default new I18n()
