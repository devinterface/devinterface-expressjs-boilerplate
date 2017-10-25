import User from '../../models/User'
import i18n from '../../common/i18n'
import {url} from '../../common/urlBuilder'

class Controller {
  async unlink (req, res, next) {
    let user = new User({
      id: req.user.id
    })
    await user.fetch()
    switch (req.params.provider) {
      case 'facebook':
        user.set('facebook', null)
        break
      // case 'google':
      //   user.set('google', null)
      //   break
      // case 'twitter':
      //   user.set('twitter', null)
      //   break
      // case 'vk':
      //   user.set('vk', null)
      //  break
      default:
        req.flash('error', {
          msg: 'Invalid OAuth Provider'
        })
        return url(req, '/')
    }
    await user.save(user.changed, {
      patch: true
    })
    res.flash('info', {
      msg: i18n.__('Your account has been unlinked.')
    })
    res.redirect(url(req, '/'))
  }
}

export default new Controller()
