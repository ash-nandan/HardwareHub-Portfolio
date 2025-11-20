import request from 'superagent'
import { BidWithListing } from 'models/bids'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserBids(userId: number) {
  const res = await request.get(`${rootURL}/bids/${userId}`)

  return res.body as BidWithListing[]
}
