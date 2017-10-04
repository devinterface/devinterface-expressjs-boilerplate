import * as express from 'express'

export default express
  .Router()
  .get('/', (req, res, next) => {
    res.render('index', { title: 'DevInterface Express.js Boilerplate' })
  })
