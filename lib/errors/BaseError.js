class BaseError extends Error {
  constructor(message, status, code) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status || 500;
    this.code = code || this.status;
  }
}

module.exports = BaseError;
