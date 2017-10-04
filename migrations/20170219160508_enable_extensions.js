
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public'),
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public'),
    knex.raw('CREATE EXTENSION IF NOT EXISTS "postgis" schema public')
  ])
}

exports.down = function (knex, Promise) {

}
