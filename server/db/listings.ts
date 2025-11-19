import { UserListing, NewListingData, Listing } from 'models/listings'
import db from './connection'

export async function createListing(
  listingData: NewListingData,
): Promise<UserListing> {
  const [newListing] = await db<UserListing>('user_listings')
    .insert(listingData)
    .returning('*')
  return newListing
}

export async function getListingById(listingId: number): Promise<Listing> {
  const res = await db('user_listings')
    .join('users', 'user_listings.user_id', 'users.id')
    .join('categories', 'user_listings.category_id', 'categories.id')
    .join('conditions', 'user_listings.condition_id', 'conditions.id')
    .where({ 'user_listings.id': listingId })
    .select(
      'user_listings.id as listingId',
      'categories.name as categoryName',
      'conditions.description as conditionDescription',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
      'users.username as username',
    )
    .first()

  return res
}

export async function deleteListing(listingId: number): Promise<number> {
  return db('user_listings').where({ 'user_listings.id': listingId }).del()
}
