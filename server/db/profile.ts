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
