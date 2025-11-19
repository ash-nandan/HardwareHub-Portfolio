import request from 'superagent'
import { Listing } from '../../models/listings'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSingleListing(listingId: number) {
  const res = await request.get(`${rootURL}/listings/${listingId}`)

  return res.body as Listing
}
