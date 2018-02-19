const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),

  // With this i can use `i18n.t` and `i18n.n` instead of `i18n.__` and `i18n.__n`
  api: {
    __: 't',
    __n: 'n',
  },
});

module.exports = i18n;
