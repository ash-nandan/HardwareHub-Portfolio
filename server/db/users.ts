import { ListingActiveTime, SwitchConfirmed } from 'models/listings'
import db from './connection'
import { ProfileConfirmed } from 'models/profile'

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
//Had to change from the db.raw format (not supported) to query builder style to avoid crashing - Joel
export async function getUserByAuthId(authId: string) {
  return await db('users').where({ auth_id: authId }).first()
}

// server/db/users.ts
//change made of parameter to authId from auth0Id to match table - Joel
//removed columns not provided in auth0 signin ie. username, address.. - Joel
//Had to change from the db.raw format (not supported) to query builder style to avoid crashing - Joel
export async function createUser(userData: { authId: string; email: string }) {
  const [newUser] = await db('users')
    .insert({
      auth_id: userData.authId,
      email: userData.email,
    })
    .returning('*')
  return newUser
}

export async function checkUserInDatabase(authId: string): Promise<boolean> {
  return (await db('users')
    .where({ 'users.auth_id': authId, 'users.username': null })
    .select('auth_id as authId')
    .first())
    ? true
    : false
}

export async function updateProfileDetails(
  authId: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  addressOne: string,
  addressTwo: string,
  townCity: string,
  postcode: string,
  imageUrl: string,
): Promise<ProfileConfirmed> {
  const result = await db('users')
    .where('users.auth_id', authId)
    .update({
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address_one: addressOne,
      address_two: addressTwo,
      town_city: townCity,
      postcode,
      image_url: imageUrl,
    })
    .returning(['id', 'username'])

  const newProfile =
    //this checks if 'result' is actually array and has an item/s in it
    Array.isArray(result) && result.length > 0
      ? result[0]
      : { id: 0, username: 'unknown' } //fallback

  return newProfile
}

export async function switchUserId(
  userId: number,
  listingId: number,
): Promise<SwitchConfirmed> {
  await db('user_listings')
    .where('id', listingId)
    .update({
      user_id: userId,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 1000),
    })

  return { newUserId: userId, listingId }
}

//function mirrored from listings route
export async function closeListings() {
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)

  const res = await db('user_listings')
    .where('is_active', true)
    .andWhere('created_at', '<', fiveDaysAgo) //andWhere gives clairty of both
    .update({ is_active: false })

  return res
}
