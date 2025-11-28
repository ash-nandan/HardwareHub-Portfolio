import request from 'superagent'
import { Bid, BidData } from '../../models/bids'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function createBid(bidData: BidData): Promise<Bid> {
  const res = await request.post(`${rootURL}/bids`).send(bidData)
  return res.body as Bid
}

export async function getBidsByListingId(listingId: number): Promise<Bid[]> {
  const res = await request.get(`${rootURL}/bids/listing/${listingId}`)
  return res.body as Bid[]
}

