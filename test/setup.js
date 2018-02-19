const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const knexCleaner = require('knex-cleaner');
const nconf = require('nconf');
const path = require('path');
const { Model } = require('objection');

require('../lib/database');

process.on('unhandledRejection', function (reason, p) {
  // eslint-disable-next-line no-console
  console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  // application specific logging here
});

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config/nconf.js') });

chai.use(chaiAsPromised);
exports.should = chai.should();

// Cleanse the DB before each test
beforeEach('Clean the database', async function () {
  await knexCleaner.clean(Model.knex(), {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
});

// Close the connection with the DB after the test suite
// otherwise mocha will continue to run forever
after('Close DB connection', async function () {
  await Model.knex().destroy();
});
