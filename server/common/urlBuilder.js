const url = (reqOrLang, urlToGo) => {
  if (typeof (reqOrLang) === 'string') {
    return `/${reqOrLang}${urlToGo}`
  } else {
    return `/${reqOrLang.getLocale()}${urlToGo}`
  }
}

module.exports.url = url
