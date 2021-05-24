const http = require('http');
const express = require('express');
const server = express();

const PORT = 1234;
const LOG_PREFIX = 'Fake server: ';
const log = (message) => console.log(LOG_PREFIX + message);

server.get('/summary', (req, res) => {
  res.send(require('./data/summary.json'));
});

server.get('/total/dayone/country/:countrySlug', (req, res) => {
  res.send(require('./data/country.json'));
});

server.get('*', (req, res, next) => {
  log(`${req.method} ${req.originalUrl}`);
  if (req.query.instance === undefined) {
    res.sendStatus(500);
  } else {
    next();
  }
});

const app = http.createServer(server);

const start = () =>
  new Promise((resolve, reject) => {
    app.on('error', (error) => {
      log(error);
      reject(error);
    });
    app.listen(PORT, () => {
      log(`listening on port ${PORT}`);
      log(`running on ${__dirname}`);
      resolve();
    });
  });

const stop = () => {
  app.close();
};

// export of type "export const ..." did not work. keeping this for now
module.exports = {start, stop};
