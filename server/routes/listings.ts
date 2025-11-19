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

router.post('/', async (req, res) => {
  try {
    const listingData = req.body
    const newListing = await db.createListing(listingData)
    res.status(201).json(newListing)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const listingId = Number(req.params.id)
    await db.deleteListing(listingId)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
