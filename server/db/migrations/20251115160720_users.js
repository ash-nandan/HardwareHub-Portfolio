export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()

    //required fields for Auth0 sync
    table.string('auth_id').notNullable().unique()
    table.string('email').notNullable().unique()

    //details that are NULL by default to start
    table.string('username').unique()
    table.string('first_name')
    table.string('last_name')
    table.string('address_one')
    table.string('address_two')
    table.string('town_city')
    table.string('postcode')
    table.string('phone')
    table.string('image_url')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
