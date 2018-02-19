const base = {
  client: 'postgresql',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

module.exports = {
  development: {
    ...base,
    connection: {
      database: 'express_starter_development',
      user: 'example',
      password: 'password',
    },
    debug: true,
  },

  test: {
    ...base,
    connection: {
      database: 'express_starter_test',
      user: 'example',
      password: 'password',
    },
  },

  production: {
    ...base,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};
