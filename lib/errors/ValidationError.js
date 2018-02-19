const BaseError = require('./BaseError');

class ValidationError extends BaseError {
  constructor(data) {
    super('ValidationError', 422);

    this.data = data;
  }
}

module.exports = ValidationError;
