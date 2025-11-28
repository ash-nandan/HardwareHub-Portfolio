import { Bid, BidData } from '../../models/bids'
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

