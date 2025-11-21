import request from 'superagent'
import { BidCheck, BidWithListing } from 'models/bids'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserBids(userId: number) {
  const res = await request.get(`${rootURL}/bids/${userId}`)

  return res.body as BidWithListing[]
}

export async function checkBids(listingId: number) {
  const res = await request.get(`${rootURL}/bids/check?listingId=${listingId}`)

  return res.body as BidCheck[]
}
