import { Bid, BidData, BidCheck, BidWithListing } from '../../models/bids'
import db from './connection'

export async function createBid(bidData: BidData): Promise<Bid> {
  const [id] = await db('bids').insert({
    user_id: bidData.userId,
    user_listing_id: bidData.userListingId,
    bid_price: bidData.bidPrice,
  })

  const newBid = await db('bids')
    .where({ id })
    .select(
      'id',
      'user_id as userId',
      'user_listing_id as userListingId',
      'bid_price as bidPrice',
      'created_at as createdAt',
    )
    .first()

  return newBid
}

export async function getBidsByListingId(listingId: number): Promise<Bid[]> {
  const bids = await db('bids')
    .where({ user_listing_id: listingId })
    .select(
      'id',
      'user_id as userId',
      'user_listing_id as userListingId',
      'bid_price as bidPrice',
      'created_at as createdAt',
    )
    .orderBy('bid_price', 'desc')

  return bids
}

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

export async function getBidCheck(listingId: number): Promise<BidCheck[]> {
  const res = await db('bids')
    .join('users', 'bids.user_id', 'users.id')
    .where({ 'bids.user_listing_id': listingId })
    .orderBy('bids.created_at', 'desc')
    .select(
      'bids.id as bidId',
      'bids.created_at as bidCreated',
      'bids.user_listing_id as listingId',
      'bids.bid_price as bidPrice',
      'users.username as bidUsername',
    )

  return res
}
