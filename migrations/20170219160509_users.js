exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.uuid('id').unique().defaultTo(knex.raw('public.gen_random_uuid()'))
      table.integer('role')
      table.string('email').unique()
      table.string('password')
      table.string('passwordResetToken')
      table.dateTime('passwordResetExpires')
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
