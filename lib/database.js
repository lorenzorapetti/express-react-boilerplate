const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const { knexSnakeCaseMappers } = require('objection');
const knex = require('knex')({
  ...config,
  ...knexSnakeCaseMappers(),
});
const { Model } = require('objection');

Model.knex(knex);
