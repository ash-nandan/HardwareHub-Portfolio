/* eslint-disable @typescript-eslint/no-explicit-any */
import connection from './connection'
import { Profile } from '../../models/profile'

export function getProfileById(id: number, db = connection): Promise<Profile> {
  return db('users').where({ id }).first()
}

export function getProfileByAuthId(
  authId: string,
  db = connection,
): Promise<Profile> {
  return db('users').where({ auth_id: authId }).first()
}

export function updateProfile(
  id: number,
  data: Partial<Profile>,
  db = connection,
): Promise<Profile> {
  return db('users')
    .where({ id })
    .update({ ...data, updated_at: new Date() })
    .returning('*')
    .then((rows) => rows[0])
}

export async function deleteProfile(
  id: number,
  db = connection,
): Promise<number> {
  return db.transaction(async (trx) => {
    const userListings = await trx('user_listings')
      .where({ user_id: id })
      .select('id')
    const userListingsId = userListings.map((row) => row.id)

    if (userListingsId.length > 0) {
      try {
        await trx<any>('bids').whereIn('user_listing_id', userListingsId).del()
      } catch (e) {
        console.error(
          'Failed to delete bids by user_listing_id for user',
          id,
          e,
        )
      }
    }
    try {
      await trx('bids').where({ user_id: id }).del()
    } catch (e) {
      console.error('Failed to delete bids by user', id, e)
    }
    try {
      await trx('user_listings').where({ user_id: id }).del()
    } catch (e) {
      console.error('Failed to delete user_listings for user', id, e)
    }
    const deleted = await trx('users').where({ id }).del()
    return deleted
  })
}
