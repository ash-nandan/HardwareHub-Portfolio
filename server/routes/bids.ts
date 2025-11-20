import express from 'express'
import * as db from '../db/bids'

const router = express.Router()

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
