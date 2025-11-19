import { Condition } from 'models/options'
import db from './connection'

export async function getAllConditions(): Promise<Condition[]> {
  const conditions = await db('conditions').select('id', 'description')

  return conditions
}
