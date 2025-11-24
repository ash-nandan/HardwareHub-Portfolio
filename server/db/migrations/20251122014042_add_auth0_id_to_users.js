export function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('auth_id').unique()
  })
}

export function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('auth_id')
  })
}
