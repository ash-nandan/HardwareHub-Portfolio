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
