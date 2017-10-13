exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('name')
    table.string('gender')
    table.string('location')
    table.string('website')
    table.string('picture')
    table.string('facebook')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('name')
    table.dropColumn('gender')
    table.dropColumn('location')
    table.dropColumn('website')
    table.dropColumn('picture')
    table.dropColumn('facebook')
  })
}
