import { BidWithListing } from 'models/bids'
import db from './connection'

export async function getAllUserBids(
  userId: number,
): Promise<BidWithListing[]> {
  const res = await db('bids')
    .join('user_listings', 'bids.user_listing_id', 'user_listings.id')
    .where({ 'bids.user_id': userId })
    .select(
      'bids.id as bidId',
      'bids.bid_price as bidPrice',
      'bids.created_at as bidCreated',
      'user_listings.id as listingId',
      'user_listings.item_name as itemName',
      'user_listings.starting_price as startingPrice',
      'user_listings.item_description as itemDescription',
      'user_listings.item_image as itemImage',
    )

  return res
}
