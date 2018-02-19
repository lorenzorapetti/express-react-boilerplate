const { app } = require('../../app');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const userSeeds = require('../seeds/users');
const addressSeeds = require('../seeds/addresses');
require('./base');

describe('POST /register', function () {
  it('should register the user', async function () {
    const res = await chai.request(app)
      .post('/register')
      .send({
        user: userSeeds.baseAttributes({ roles: [0] }),
        address: addressSeeds(),
      });
    res.should.have.status(200);
    res.should.be.json;
  });

  it('should return validation errors', async function () {
    try {
      await chai.request(app)
        .post('/register')
        .send({ user: { }, address: { } });
    } catch (err) {
      err.response.res.statusCode.should.be.equal(422);
      err.response.res.should.be.json;
      err.response.res.body.error.message.should.be.an('array');
      err.response.res.body.error.message.should.have.lengthOf(7);
    }
  });
});

describe('POST /login', function () {
  const email = 'user@example.com';
  const password = 'example123';
  let user;

  beforeEach('Create a user', async function () {
    user = await userSeeds.operator({
      email, password,
    });
  });

  it('should login the user', async function () {
    const res = await chai.request(app)
      .post('/login')
      .send({ email, password });

    res.should.have.status(200);
    res.should.be.json;

    const payload = jwt.verify(res.body.token, nconf.get('JWT_SECRET'));
    payload.id.should.equal(user.id);
  });

  it('should return unauthorized', async function () {
    try {
      await chai.request(app)
        .post('/login')
        .send({ email: '' });
    } catch (err) {
      err.response.res.statusCode.should.be.equal(401);
      err.response.res.should.be.json;
      err.response.res.body.error.code.should.equal(401);
    }
  });
});

describe('POST /token/refresh', function () {
  let user;

  beforeEach('Create a user', async function () {
    user = await userSeeds.doctor();
  });

  it('should refresh the token', async function () {
    const token = user.generateToken();

    const res = await chai.request(app)
      .post('/token/refresh')
      .set('Authorization', `Bearer ${token}`)
      .send();

    res.should.have.status(200);
    res.should.have.json;

    const payload = jwt.verify(res.body.token, nconf.get('JWT_SECRET'));
    payload.id.should.equal(user.id);
  });
});
