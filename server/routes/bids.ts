import express from 'express'
import * as db from '../db/bids'

const router = express.Router()

// POST /api/v1/bids - Create a new bid
router.post('/', async (req, res) => {
  try {
    const bidData = req.body
    const newBid = await db.createBid(bidData)
    res.status(201).json(newBid)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong creating the bid')
  }
})

// GET /api/v1/bids/listing/:listingId - Get all bids for a listing
router.get('/listing/:listingId', async (req, res) => {
  try {
    const listingId = Number(req.params.listingId)
    const bids = await db.getBidsByListingId(listingId)
    res.json(bids)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong fetching bids')
  }
})

router.get('/check', async (req, res) => {
  try {
    const listingId = Number(req.query.listingId)

    const checkRes = await db.getBidCheck(listingId)
    res.json(checkRes)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const bids = await db.getAllUserBids(userId)
    res.json(bids)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
