const BaseError = require('./BaseError');

class TokenInvalidError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = TokenInvalidError;
