export function up(knex) {
  return knex.schema.createTable('conditions', (table) => {
    table.increments('id').primary()
    table.string('description').notNullable().unique()
  })
}

export async function down(knex) {
  return knex.schema.dropTable('conditions')
}
