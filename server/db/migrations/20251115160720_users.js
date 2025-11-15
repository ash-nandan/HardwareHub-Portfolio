export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth_id').notNullable().unique()
    table.string('username').notNullable().unique()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable().unique()
    table.string('address_one').notNullable()
    table.string('address_two')
    table.string('town_city').notNullable()
    table.string('postcode').notNullable()
    table.string('phone')
    table.string('image_url')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
