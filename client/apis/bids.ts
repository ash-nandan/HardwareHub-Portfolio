import request from 'superagent'
import { Bid, BidData, BidCheck, BidWithListing } from '../../models/bids'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function createBid(bidData: BidData): Promise<Bid> {
  const res = await request.post(`${rootURL}/bids`).send(bidData)
  return res.body as Bid
}

export async function getBidsByListingId(listingId: number): Promise<Bid[]> {
  const res = await request.get(`${rootURL}/bids/listing/${listingId}`)
  return res.body as Bid[]
}

export async function getUserBids(userId: number) {
  const res = await request.get(`${rootURL}/bids/${userId}`)

  return res.body as BidWithListing[]
}

export async function checkBids(listingId: number) {
  const res = await request.get(`${rootURL}/bids/check?listingId=${listingId}`)

  return res.body as BidCheck[]
}
