import request from 'superagent'
import { ListingActiveTime } from '../../models/listings'
import { ProfilePatch, ProfileResponse } from 'models/profile'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserListings(userId: number) {
  const res = await request.get(`${rootURL}/users/${userId}`)

  return res.body as ListingActiveTime[]
}

export async function checkUser(authId: string) {
  const res = await request.get(`${rootURL}/users/check?authId=${authId}`)
  return res.body ? true : false
}

export async function setupProfile(
  profileDetails: ProfilePatch,
  token: string,
) {
  const result = await request
    .patch(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(profileDetails)
  return result.body as ProfileResponse
}
