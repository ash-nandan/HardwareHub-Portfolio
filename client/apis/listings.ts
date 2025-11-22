import request from 'superagent'
import {
  Listing,
  ListingActiveTime,
  NewListingData,
  UserListing,
} from '../../models/listings'
//import { User } from '@auth0/auth0-react'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSingleListing(listingId: number) {
  const res = await request.get(`${rootURL}/listings/${listingId}`)

  return res.body as ListingActiveTime
}

export async function createNewLisitng(listingData: NewListingData) {
  const res = await request.post(`${rootURL}/listings`).send(listingData)
  return res.body as Listing
}

export async function updateListing(
  listingId: number,
  listingData: Partial<UserListing>,
) {
  const req = await request
    .patch(`${rootURL}/listings/${listingId}`)
    .send(listingData)
  return req.body as UserListing
}
// used Partial just in case you dont want to update every thing in the listing

export async function searchListings(
  catId: number,
  conId: number,
  keywords: string,
) {
  const res = await request.get(
    `${rootURL}/listings/search?catId=${catId}&conId=${conId}&keywords=${keywords}`,
  )

  return res.body as Listing[]
}

export async function getRecentListings() {
  const res = await request.get(`${rootURL}/listings/recent`)

  return res.body as ListingActiveTime[]
}

export async function checkClosedUserListings(userId: number) {
  const res = await request.get(`${rootURL}/listings/check?userId=${userId}`)

  return res.body as Listing[]
}
