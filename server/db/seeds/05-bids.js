export async function seed(knex) {
  await knex('bids').del()
  await knex('bids').insert([
    {
      id: 1,
      user_id: 2,
      user_listing_id: 2,
      bid_price: 480,
      created_at: new Date('2025-01-15T10:00:00Z'),
    },
    {
      id: 2,
      user_id: 3,
      user_listing_id: 2,
      bid_price: 495,
      created_at: new Date('2025-01-15T10:05:00Z'),
    },
    {
      id: 3,
      user_id: 1,
      user_listing_id: 2,
      bid_price: 510,
      created_at: new Date('2025-01-15T10:12:00Z'),
    },

    {
      id: 4,
      user_id: 1,
      user_listing_id: 5,
      bid_price: 150,
      created_at: new Date('2025-02-03T14:20:00Z'),
    },
    {
      id: 5,
      user_id: 3,
      user_listing_id: 5,
      bid_price: 160,
      created_at: new Date('2025-02-03T14:27:00Z'),
    },
    {
      id: 6,
      user_id: 2,
      user_listing_id: 5,
      bid_price: 170,
      created_at: new Date('2025-02-03T14:33:00Z'),
    },
  ])
}
