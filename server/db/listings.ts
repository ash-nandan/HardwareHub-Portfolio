import { Listing } from 'models/listings';
import db from './connection'

export async function getListingById(
  listingId: number
): Promise<Listing> {
  const res = await db('user_listings').where({id: listingId}).first().select()
}