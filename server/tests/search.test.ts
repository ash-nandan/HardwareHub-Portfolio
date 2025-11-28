import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'

import connection from '../db/connection.ts'
import server from '../server.ts'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('search listings', () => {
  it('returns matching results when a keyword exists', async () => {
    const res = await request(server).get(
      '/api/v1/listings/search?catId=1&conId=1&keywords=intel',
    )
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].itemName).toBe('Intel Core i5-11400F Processor')
  })

  it('returns an empty array when no keyword matches', async () => {
    const res = await request(server).get(
      '/api/v1/listings/search?catId=1&conId=1&keywords=banana',
    )
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveLength(0)
  })

  it('returns matching results when partial word entered', async () => {
    const res = await request(server).get(
      '/api/v1/listings/search?catId=2&conId=2&keywords=nvi',
    )
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].itemName).toBe('NVIDIA GeForce RTX 3060 12GB')
  })
})
