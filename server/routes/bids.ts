import express from 'express'
import * as db from '../db/bids'

const router = express.Router()

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
