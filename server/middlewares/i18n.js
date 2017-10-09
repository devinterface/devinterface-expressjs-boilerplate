import i18n from '../common/i18n'
export class I18n {
  async setLocale (req, res, next) {
    if (req.params.lang) {
      i18n.setLocale([req, res.locals], req.params.lang)
      next()
    } else {
      return res.redirect(`/${i18n.getLocale()}/`)
    }
  }
}

export default new I18n()
