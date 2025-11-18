import { Listing } from 'models/listings';
import db from './connection'

export async function getListingById(
  listingId: number
): Promise<Listing> {
  const res = await db('user_listings').join('users', 'user_listings.id', 'users.id').where({id: listingId}).first().select('users.username as username', 'user_listings.')
}