import { ListingActiveTime } from 'models/listings'
import db from './connection'

export async function getListingsByUser(
  userId: number,
): Promise<ListingActiveTime[]> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .where({ 'user_listings.user_id': userId })
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
      'user_listings.created_at as createdAt',
      'user_listings.is_active as isActive',
    )

  return res
}

// server/db/users.ts
export async function getUserByAuthId(auth0Id: string) {
  const result = await db.raw(
    'SELECT * FROM users WHERE auth0Id = ? LIMIT 1', // Use exact column name!
    [auth0Id],
  )
  return result[0]
}

// server/db/users.ts
export async function createUser(userData: {
  auth0_id: string
  username: string
  email: string
}) {
  const result = await db.raw(
    `INSERT INTO users (auth0Id, auth_id, username, email, first_name, last_name, address_one, town_city, postcode) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
     RETURNING *`,
    [
      userData.auth0_id,
      userData.auth0_id, // Also fill auth_id (seems like a duplicate column)
      userData.username,
      userData.email || 'no-email@example.com',
      userData.username || 'User',
      '',
      'N/A',
      'N/A',
      '0000',
    ],
  )
  return result[0]
}

export async function checkUserInDatabase(authId: string): Promise<boolean> {
  return (await db('users')
    .where({ 'users.auth_id': authId, 'uesrs.phone': null })
    .select('auth_id as authId')
    .first())
    ? true
    : false
}
