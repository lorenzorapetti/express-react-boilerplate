const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const nconf = require('nconf');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: nconf.get('JWT_SECRET'),
};

// Add JWT strategy
passport.use(new Strategy(opts, (payload, done) => {
  User.query().findById(payload.id)
    .then(user => done(null, user || false))
    .catch(err => done(err, false));
}));

/**
 * This is a shorthand to use in middlewares for authorizing endpoints
 */
exports.jwtAuthenticate = () => passport.authenticate('jwt', { session: false });
exports.passport = passport;
