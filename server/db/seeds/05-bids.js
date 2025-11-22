export async function seed(knex) {
  await knex('bids').del()
  await knex('bids').insert([
    {
      id: 1,
      user_id: 2,
      user_listing_id: 2,
      bid_price: 480,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      user_id: 3,
      user_listing_id: 2,
      bid_price: 495,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      user_id: 1,
      user_listing_id: 2,
      bid_price: 510,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },

    {
      id: 4,
      user_id: 1,
      user_listing_id: 5,
      bid_price: 150,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 5,
      user_id: 3,
      user_listing_id: 5,
      bid_price: 160,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      user_id: 2,
      user_listing_id: 5,
      bid_price: 170,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 7,
      user_id: 1,
      user_listing_id: 6,
      bid_price: 220,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 8,
      user_id: 2,
      user_listing_id: 6,
      bid_price: 235,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 9,
      user_id: 1,
      user_listing_id: 6,
      bid_price: 250,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ])
}

// (- # * 24 * 60 * 60 * 1000) = # of days ago time formula
