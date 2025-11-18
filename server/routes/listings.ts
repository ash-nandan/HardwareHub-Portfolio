import express from 'express'
import * as db from '../db/listings'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const listingId = Number(req.params.id)
    const listing = await db.getListingById(listingId)
    res.json(listing)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
