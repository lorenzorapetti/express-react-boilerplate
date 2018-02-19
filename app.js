const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');

const errorMiddlewares = require('./routes/errors');
const i18n = require('./lib/i18n');
const nconf = require('./lib/config');
const { passport } = require('./lib/auth');
// Setup database with objection.js
require('./lib/database');

// Setup logging
const logger = require('./lib/logger');

const app = express();
const port = nconf.any('PORT', 'NODE_PORT', 'port') || 8080;
const server = require('http').createServer(app);

// When a client doesn't support HTTP PUT or DELETE, it can send a POST
// with the `_method` set to PUT or DELETE
app.use(methodOverride('_method'));
// Security middlewares
app.use(helmet());
app.use(morgan('combined', {
  stream: {
    write(message) { logger.info(message); },
  },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(i18n.init);
app.use(passport.initialize());

// Here we dynamically import all the route files placed in ./routes
const files = fs.readdirSync('./routes');
files.forEach((file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const route = require(`./routes/${file}`);
  if (typeof route === 'function') {
    app.use('/', route);
  } else if (typeof route === 'object' && route.router) {
    app.use(route.baseRoute || '/', route.router);
  }
});

/**
 * This is the last middleware in the stack.
 * If a request arrives here, it means that the route
 * that was request was not found
 */
app.use((req, res, next) => {
  const err = new Error(res.t('Not Found'));
  err.status = 404;
  next(err);
});

// Error handlers
Object.keys(errorMiddlewares).forEach(name => app.use(errorMiddlewares[name]));

// Start the server
server.listen(port);

module.exports = { app, server }; // For testing
