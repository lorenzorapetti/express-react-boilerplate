const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nconf = require('../lib/config');
const TokenInvalidError = require('../lib/errors/TokenInvalidError');
const User = require('../models/User');
const { async, validate } = require('../lib/middlewares');
const { validateLogin } = require('../lib/validation/auth');

const router = express.Router();

/**
 * Login a user by generating a JWT token
 */
router.post('/login', validateLogin, validate, async(async (req, res) => {
  const user = await User.query().findOne({ email: req.body.email });
  if (!user || !req.body.password) throw new User.NotFoundError();

  req.user = user;
  if (await bcrypt.compare(req.body.password, user.get('encrypted_password'))) {
    // We have found and verified the user, let's give it a token
    res.json({ token: req.user.generateToken() });
  } else {
    throw new User.NotFoundError();
  }
}));

router.get('/user', async(async (req, res) => {
  const user = await User.query().findById(1235).throwIfNotFound();
  res.json(user);
}));

/**
 * Validates and saves the user in the database
 */
router.post('/register', async(async (req, res) => {
  const user = await User.createWithRelations(req.body);
  res.json(user);
}));

/**
 * Takes the old token and generates a new one
 */
router.post('/token/refresh', async(async (req, res) => {
  let token = req.headers.authorization;
  if (!token) throw new TokenInvalidError(res.t('No token supplied'));

  // Delete the "Bearer " part
  token = token.replace(/^Bearer /gi, '');
  let decoded;
  try {
    decoded = jwt.verify(token, nconf.get('JWT_SECRET'));
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // We don't care about the signature verification if the token is expired
      decoded = jwt.decode(token);
    } else {
      throw err;
    }
  }

  const user = await User.findById(decoded.id);
  res.json({ token: user.generateToken() });
}));

module.exports = router;
