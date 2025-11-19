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
