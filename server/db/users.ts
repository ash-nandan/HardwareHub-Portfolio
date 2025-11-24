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
//change made of parameter to authId from auth0Id to match table - Joel
export async function getUserByAuthId(authId: string) {
  const result = await db.raw(
    'SELECT * FROM users WHERE auth_id = ? LIMIT 1', // Use exact column name!
    [authId],
  )
  return result[0]
}

// server/db/users.ts
//change made of parameter to authId from auth0Id to match table - Joel
//removed columns not provided in auth0 signin ie. username, address.. - Joel
export async function createUser(userData: { authId: string; email: string }) {
  const result = await db.raw(
    `INSERT INTO users ( auth_id, email,) 
     VALUES (?, ?) 
     RETURNING *`,
    [userData.authId, userData.email],
  )
  return result[0]
}

export async function checkUserInDatabase(authId: string): Promise<boolean> {
  return (await db('users')
    .where({ 'users.auth_id': authId, 'users.phone': null })
    .select('auth_id as authId')
    .first())
    ? true
    : false
}
