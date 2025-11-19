import request from 'superagent'
import { Listing, NewListingData } from '../../models/listings'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSingleListing(listingId: number) {
  const res = await request.get(`${rootURL}/listings/${listingId}`)

  return res.body as Listing
}

export async function createNewLisitng(listingData: NewListingData) {
  const res = await request.post(`${rootURL}/listings`).send(listingData)
  return res.body as Listing
}

export async function updateListing(
  listingId: number,
  listingData: Partial<Listing>,
) {
  const req = await request
    .patch(`${rootURL}/listings/${listingId}`)
    .send(listingData)
  return req.body as Listing
}
// used Partial just in case you dont want to update every thing in the listing
