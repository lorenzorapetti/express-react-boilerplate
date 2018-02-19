const { check } = require('express-validator/check');

exports.validateLogin = [
  check('email')
    .isEmail()
    .withMessage((value, { req }) => req.t('is not a valid email'))
    .trim()
    .normalizeEmail(),
  check('password').not().isEmpty()
    .withMessage((value, { req }) => req.t('is required')),
];
