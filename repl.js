const fs = require('fs');
const path = require('path');
const repl = require('repl').start({
  useColors: true,
});

require('./lib/database');

repl.context.objection = require('objection');

const files = fs.readdirSync(path.resolve(__dirname, 'models'));
files.forEach((file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const modelClass = require(`./models/${file}`);

  repl.context[modelClass.name] = modelClass;
});

repl.on('exit', () => process.exit());
