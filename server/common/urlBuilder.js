const url = (req, urlToGo) => {
  return `/${req.getLocale()}${urlToGo}`
}

module.exports.url = url
