import request from 'superagent'
import { Category, Condition } from 'models/options'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getCategories() {
  const res = await request.get(`${rootURL}/categories`)

  return res.body as Category[]
}

export async function getConditions() {
  const res = await request.get(`${rootURL}/conditions`)

  return res.body as Condition[]
}
