export function up(knex) {
  return knex.schema.createTable('user_listings', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable().references('users.id')
    table.integer('category_id').notNullable().references('categories.id')
    table.integer('condition_id').notNullable().references('conditions.id')
    table.string('item_name').notNullable()
    table.integer('starting_price').notNullable()
    table.text('item_description').notNullable()
    table.string('item_image').notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTable('user_listings')
}
