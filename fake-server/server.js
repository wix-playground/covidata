const http = require('http')
const express = require('express')
const server = express()
const chalk = require('chalk')
import {PORT} from '../env.e2e'

const LOG_PREFIX = chalk.white.bgBlue.bold('Fake server:') + ' '
const log = message => console.log(LOG_PREFIX + message)

server.get('/summary', (req, res) => {
  log(`request for summary`)
  res.send(require('./data/summary.json'))
})

server.get('/total/dayone/country/:countryslug', (req, res) => {
  log(`request for details of ${req.params["countryslug"].toUpperCase()}`)
  res.send(require('./data/country.json'))
})

server.get('*', (req, res, next) => {
  log(`${req.method} ${req.originalUrl}`)
  if (req.query['instance'] === undefined) {
    res.sendStatus(500)
  } else {
    next()
  }
})

const app = http.createServer(server)

const start = () => new Promise((resolve, reject) => {
  app.on('error', error => {
    log(error)
    reject(error)
  })
  app.listen(PORT, () => {
    log(`listening on port ${PORT}`)
    log(`running on ${__dirname}`)
    resolve()
  })
})

const stop = () => {
  app.close();
}

module.exports = {start, stop, log}