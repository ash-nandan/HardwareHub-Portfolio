import { Category } from 'models/options'
import db from './connection'

export async function getAllCategories(): Promise<Category[]> {
  const categories = await db('categories').select('id', 'name')

  return categories
}
