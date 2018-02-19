const bcrypt = require('bcrypt');
const nconf = require('nconf');

exports.encryptPassword = async password => bcrypt.hash(password, parseInt(nconf.get('SALT_ROUNDS'), 10));
