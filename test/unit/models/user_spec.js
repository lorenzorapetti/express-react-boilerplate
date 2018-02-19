const User = require('../../../models/User');
const userSeeds = require('../../seeds/users');
const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const { should } = require('../base');

describe('User', function () {
  describe('#create', function () {
    it('should create the user', async function () {
      const user = await userSeeds.user();
      user.id.should.not.be.null;
    });

    it('should not create the user without the required fields', async function () {
      try {
        await User.query().insert({ });
      } catch (err) {
        err.type.should.equal('ModelValidation');
        err.data.email[0].keyword.should.equal('required');
        err.data.password[0].keyword.should.equal('required');
      }
    });
  });

  describe('#generateToken', function () {
    it('should create a valid jwt token', async function () {
      const user = await userSeeds.user();
      const token = user.generateToken();
      const payload = jwt.verify(token, nconf.get('JWT_SECRET'));

      payload.id.should.equal(user.id);
    });

    it('should return null if the user is not in db', async function () {
      const user = new User();
      const token = user.generateToken();

      should.equal(token, null);
    });
  });
});
