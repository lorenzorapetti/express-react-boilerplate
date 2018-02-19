const { server } = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('../setup');

chai.use(chaiHttp);

after('Close HTTP connection', function (done) {
  server.close(done);
});
