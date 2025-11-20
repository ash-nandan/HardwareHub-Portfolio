export function up(knex) {
  return knex.schema.createTable('bids', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable().references('users.id')
    table
      .integer('user_listing_id')
      .notNullable()
      .references('user_listings.id')
    table.integer('bid_price').notNullable()
    table.timestamp('created_at').notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTable('bids')
}
