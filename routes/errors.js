const { Model } = require('objection');
const logger = require('../lib/logger');
const { isDevelopment } = require('../lib/common');

/**
 * Error handlers
 * For express to recognize these middlewares as error handlers,
 * we need to have 4 parameters, `err`, `req`, `res` and `next`,
 * even though we're not going to use all of them.
 */
module.exports = {
  /**
   * Handles the errors from the database (e.g. a duplicate contraint violation)
   */
  pgError(err, req, res, next) {
    if (err.table && err.schema && err.constraint) {
      err.status = 422; // Unprocessable entity
      err.message = res.t(`${err.constraint}_error`);
    }
    next(err);
  },

  /**
   * Handles the not found error.
   */
  notFoundError(err, req, res, next) {
    if (err instanceof Model.NotFoundError) {
      err.status = 401; // Unauthorized
      err.message = err.data.modelClass ? res.t(`${err.data.modelClass} not found`) : res.t('Record not found');
      err.processed = true;
    }
    next(err);
  },

  /**
   * This is the final error handler.
   * It generates the response to send to the client based on the type of error
   */
  generalError(err, req, res, next) { // eslint-disable-line no-unused-vars
    // Show the error message
    logger.error(err);

    const {
      message, status, stack,
    } = err;

    const code = err.code || status;

    const response = {
      message, status, code,
    };

    if (err.data !== undefined) {
      response.errors = err.data.errors;
    }

    if (isDevelopment()) {
      response.stack = stack;
    }

    res.status(err.status || 500);
    res.json(response);
  },
};
