export async function seed(knex) {
  await knex('user_listings').del()
  await knex('user_listings').insert([
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      condition_id: 1,
      item_name: 'Intel Core i5-11400F Processor',
      starting_price: 180,
      item_description:
        'Six-core Intel Core i5-11400F pulled from a working gaming build. Runs cool and has never been overclocked. Great budget option for 1080p gaming.',
      item_image: 'listing1.jpg',
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 1), // 4 days ago
      is_active: true,
    },
    {
      id: 2,
      user_id: 1,
      category_id: 2,
      condition_id: 2,
      item_name: 'NVIDIA GeForce RTX 3060 12GB',
      starting_price: 450,
      item_description:
        'RTX 3060 12GB used lightly for casual gaming, never mined on. Original box included and kept in a smoke-free home.',
      item_image: 'listing2.jpg',
      created_at: new Date(
        Date.now() - 4 * 24 * 60 * 60 * 1000 - 20 * 60 * 60 * 1000,
      ), // 4 days 20 hours ago
      is_active: true,
    },
    {
      id: 3,
      user_id: 2,
      category_id: 3,
      condition_id: 3,
      item_name: 'MSI B550 Tomahawk ATX Motherboard',
      starting_price: 260,
      item_description:
        'Brand new MSI B550 Tomahawk still in sealed anti-static bag. Bought for a build that changed direction before assembly.',
      item_image: 'listing3.jpg',
      created_at: new Date(
        Date.now() - 4 * 24 * 60 * 60 * 1000 - 22 * 60 * 60 * 1000,
      ), // 4 days 22 hours ago
      is_active: true,
    },
    {
      id: 4,
      user_id: 2,
      category_id: 4,
      condition_id: 1,
      item_name: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200',
      starting_price: 90,
      item_description:
        '16GB kit of Corsair Vengeance LPX DDR4-3200. Used for about two years in a home office PC with no issues.',
      item_image: 'listing4.jpg',
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 4), // 4 days ago
      is_active: true,
    },
    {
      id: 5,
      user_id: 3,
      category_id: 5,
      condition_id: 2,
      item_name: 'Samsung 970 EVO Plus 1TB NVMe SSD',
      starting_price: 140,
      item_description:
        '1TB Samsung 970 EVO Plus NVMe SSD with very low power-on hours. Used as a secondary drive for game storage.',
      item_image: 'listing5.jpg',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 1000), // 45 sec before expiry
      is_active: true,
    },
    {
      id: 6,
      user_id: 3,
      category_id: 6,
      condition_id: 3,
      item_name: 'Seasonic Focus GX-750 750W 80+ Gold PSU',
      starting_price: 210,
      item_description:
        'Seasonic Focus GX-750 fully modular 750W power supply, 80+ Gold rated. Still in original packaging with all modular cables included.',
      item_image: 'listing6.jpg',
      created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // inactive, safe
      is_active: false,
    },
    {
      id: 7,
      user_id: 2,
      category_id: 1,
      condition_id: 2,
      item_name: 'ADATA XPG SX8200 Pro 512GB NVMe SSD',
      starting_price: 75,
      item_description:
        'Fast and reliable NVMe SSD ideal for gaming and productivity. Lightly used with excellent health status.',
      item_image: 'listing1.jpg',
      created_at: new Date(
        Date.now() - 4 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000,
      ), // 4 days 12 hours ago
      is_active: true,
    },
  ])

  //times assigned to work with demo experience for signed in user
}
