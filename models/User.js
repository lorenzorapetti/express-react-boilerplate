const BaseModel = require('./BaseModel');
const { encryptPassword } = require('../lib/common');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const nconf = require('nconf');

class User extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
    };
  }

  async $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext);

    this.password = await encryptPassword(this.password);
  }

  /**
   * Generates a JWT token based on the id.
   *
   * @returns {null|string} The signed token or null if the model is new
   */
  generateToken() {
    // We don't want to generate the token without the ID
    if (!this.$hasId()) return null;

    return jwt.sign({
      id: this.id,
      exp: moment().add(2, 'hours').unix(), // 2 hours from now as a Unix timestamp (in seconds)
    }, nconf.get('JWT_SECRET'));
  }
}

module.exports = User;
