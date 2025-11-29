import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../db/connection'
import server from '../server'
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

describe('POST /api/v1/bids', () => {
  it('should create a new bid successfully', async () => {
    const newBid = {
      userId: 2,
      userListingId: 1,
      bidPrice: 200,
    }

    const res = await request(server)
      .post('/api/v1/bids')
      .send(newBid)
    
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('userId', 2)
    expect(res.body).toHaveProperty('userListingId', 1)
    expect(res.body).toHaveProperty('bidPrice', 200)
    expect(res.body).toHaveProperty('createdAt')
  })

  it('should create multiple bids for the same listing', async () => {
    const firstBid = {
      userId: 1,
      userListingId: 3,
      bidPrice: 300,
    }

    const secondBid = {
      userId: 2,
      userListingId: 3,
      bidPrice: 350,
    }

    const res1 = await request(server)
      .post('/api/v1/bids')
      .send(firstBid)
    
    expect(res1.status).toBe(StatusCodes.CREATED)
    expect(res1.body).toHaveProperty('bidPrice', 300)

    const res2 = await request(server)
      .post('/api/v1/bids')
      .send(secondBid)
    
    expect(res2.status).toBe(StatusCodes.CREATED)
    expect(res2.body).toHaveProperty('bidPrice', 350)
  })
})

describe('GET /api/v1/bids/listing/:listingId', () => {
  it('should return all bids for a listing ordered by price descending', async () => {
    const res = await request(server).get('/api/v1/bids/listing/2')
    
    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    
    // Check bids are ordered by price (highest first)
    if (res.body.length > 1) {
      expect(res.body[0].bidPrice).toBeGreaterThanOrEqual(res.body[1].bidPrice)
    }
  })

  it('should return empty array for listing with no bids', async () => {
    const res = await request(server).get('/api/v1/bids/listing/1')
    
    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(0)
  })

  it('should return bid with correct structure', async () => {
    const res = await request(server).get('/api/v1/bids/listing/2')
    
    expect(res.status).toBe(StatusCodes.OK)
    if (res.body.length > 0) {
      const bid = res.body[0]
      expect(bid).toHaveProperty('id')
      expect(bid).toHaveProperty('userId')
      expect(bid).toHaveProperty('userListingId')
      expect(bid).toHaveProperty('bidPrice')
      expect(bid).toHaveProperty('createdAt')
    }
  })
})

describe('GET /api/v1/bids/check', () => {
  it('should return bids with username for a listing', async () => {
    const res = await request(server).get('/api/v1/bids/check?listingId=2')
    
    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    
    if (res.body.length > 0) {
      const bid = res.body[0]
      expect(bid).toHaveProperty('bidId')
      expect(bid).toHaveProperty('listingId')
      expect(bid).toHaveProperty('bidPrice')
      expect(bid).toHaveProperty('bidUsername')
      expect(bid).toHaveProperty('bidCreated')
    }
  })

  it('should return bids ordered by creation date descending', async () => {
    const res = await request(server).get('/api/v1/bids/check?listingId=2')
    
    expect(res.status).toBe(StatusCodes.OK)
    
    // Check bids are ordered by created_at (most recent first)
    if (res.body.length > 1) {
      const firstDate = new Date(res.body[0].bidCreated)
      const secondDate = new Date(res.body[1].bidCreated)
      expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime())
    }
  })
})

describe('GET /api/v1/bids/:id', () => {
  it('should return all bids for a user with listing details', async () => {
    const res = await request(server).get('/api/v1/bids/1')
    
    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    
    if (res.body.length > 0) {
      const bid = res.body[0]
      expect(bid).toHaveProperty('bidId')
      expect(bid).toHaveProperty('listingId')
      expect(bid).toHaveProperty('bidPrice')
      expect(bid).toHaveProperty('itemName')
      expect(bid).toHaveProperty('itemDescription')
      expect(bid).toHaveProperty('itemImage')
      expect(bid).toHaveProperty('startingPrice')
      expect(bid).toHaveProperty('bidCreated')
    }
  })

  it('should return empty array for user with no bids', async () => {
    // Create a new user with no bids
    const res = await request(server).get('/api/v1/bids/9999')
    
    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(0)
  })
})

describe('Bid creation validation', () => {
  it('should handle bid creation with valid data', async () => {
    const validBid = {
      userId: 3,
      userListingId: 1,
      bidPrice: 250,
    }

    const res = await request(server)
      .post('/api/v1/bids')
      .send(validBid)
    
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body.bidPrice).toBe(250)
  })

  it('should track timestamp when bid is created', async () => {
    const newBid = {
      userId: 1,
      userListingId: 4,
      bidPrice: 100,
    }

    const beforeTime = new Date()
    
    const res = await request(server)
      .post('/api/v1/bids')
      .send(newBid)
    
    const afterTime = new Date()
    
    expect(res.status).toBe(StatusCodes.CREATED)
    expect(res.body).toHaveProperty('createdAt')
    
    const createdAt = new Date(res.body.createdAt)
    expect(createdAt.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime())
    expect(createdAt.getTime()).toBeLessThanOrEqual(afterTime.getTime())
  })
})

