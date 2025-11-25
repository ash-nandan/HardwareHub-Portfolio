import request from 'superagent'
import { ListingActiveTime } from '../../models/listings'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserListings(userId: number) {
  const res = await request.get(`${rootURL}/users/${userId}`)

  return res.body as ListingActiveTime[]
}

export async function checkUser(authId: string) {
  const res = await request.get(`${rootURL}/users/check?authId=${authId}`)
  return res.body ? true : false
}
