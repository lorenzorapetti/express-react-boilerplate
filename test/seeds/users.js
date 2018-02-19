const faker = require('faker');
const _ = require('lodash');
const User = require('../../models/User');

exports.baseAttributes = function (attrs = {}) {
  return _.merge({
    email: faker.internet.email(),
    password: faker.internet.password(8),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    id_code: faker.random.alphaNumeric(10),
    birthdate: faker.date.past(),
    sex: _.shuffle(['M', 'F'])[0],
    status: 0,
  }, attrs);
};

exports.user = async () => User.query().insert({
  email: faker.internet.email(),
  password: 'password',
});

// exports.patient = async function (attrs) {
//   return User.createWithRelations({
//     user: _.extend(exports.baseAttributes(attrs), { roles: [0] }),
//     address: addressSeeds(),
//   });
// };

// exports.doctor = async function (attrs) {
//   return User.createWithRelations({
//     user: _.extend(exports.baseAttributes(attrs), { roles: [1] }),
//     address: addressSeeds(),
//   });
// };

// exports.operator = async function (attrs) {
//   return User.createWithRelations({
//     user: _.extend(exports.baseAttributes(attrs), { roles: [2] }),
//     address: addressSeeds(),
//   });
// };

// exports.admin = async function (attrs) {
//   return User.createWithRelations({
//     user: _.extend(exports.baseAttributes(attrs), { roles: [3] }),
//     address: addressSeeds(),
//   });
// };

// exports.operatorWithRhs = async function (attrs) {
//   const { rhs } = await rhsSeeds.rhs();
//   const operator = await exports.operator(attrs);

//   await operator.rhs().attach(rhs);

//   return {
//     rhs,
//     operator: await operator.refresh({ withRelated: ['rhs'] }),
//   };
// };

// exports.doctorWithVisit = async function () {
//   const { visit } = await visitSeeds.visit();
//   const doctor = await exports.doctor();

//   await doctor.visits().attach(visit);

//   return doctor.refresh({ withRelated: ['visits'] });
// };
