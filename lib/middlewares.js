const _ = require('lodash');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const ValidationError = require('../lib/errors/ValidationError');

/**
 * A simple wrapper to use async/await features in express middlewares.
 *
 * To use it, just write:
 *
 * ```
 * const { async } = require('./lib/middlewares');
 *
 * router.get('/users/:id', async(async (req, res, next) => {
 *    const thing = await anotherThing();
 *    // other code
 * }));
 * ```
 *
 * @param {function} fn The actual middleware
 * @returns {function} A wrapper for the middleware
 */
exports.async = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Middleware that throws a `ValidationError` if the request
 * has validation errors or extracts the filtered and sanitized data if
 * the request has no errors.
 *
 * To use it:
 *
 * ```
 * const { check } = require('express-validator/check');
 * const { validation } = require('./lib/middlewares');
 *
 * router.post('/login', [
 *   check('email').isEmail().trim(),
 * ], validation, (req, res) => {
 *   req.matchedData // Data that has been sanitized and filtered
 *   req.matchedQueryData // Data from `req.query` that has been sanitized and filtered
 *   req.matchedBodyData // Data from `req.body` that has been sanitized and filtered
 * })
 * ```
 */
exports.validate = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = _.reduce(errors.array(), (result, value) => {
      (result[value.param] || (result[value.param] = [])).push(value.msg);
      return result;
    }, {});

    throw new ValidationError({ errors });
  }

  req.matchedQueryData = matchedData(req, { locations: ['query'] });
  req.matchedBodyData = matchedData(req, { locations: ['body'] });
  req.matchedData = matchedData(req);
  next();
};
