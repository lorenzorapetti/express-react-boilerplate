const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');
const { isDevelopment } = require('../lib/common');

// Create the logger that prints on files asynchronously and in the console if we are in development
const logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: path.resolve(__dirname, '../log/error.log'), level: 'error' }),
    new winston.transports.DailyRotateFile({ filename: path.resolve(__dirname, '../log/log'), level: 'info' }),
  ],
});

if (isDevelopment()) {
  logger.add(winston.transports.Console, {
    colorize: true,
  });
}

module.exports = logger;
