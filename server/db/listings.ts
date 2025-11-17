import { UserListing, NewListingData } from 'models/listings'
import db from './connection'

export async function createListing(
  listingData: NewListingData,
): Promise<UserListing> {
  const [newListing] = await db<UserListing>('listings')
    .insert(listingData)
    .returning('*')
  return newListing
}
