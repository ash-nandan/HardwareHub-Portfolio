import express from 'express'
import * as db from '../db/listings'

const router = express.Router()

router.get('/search', async (req, res) => {
  try {
    const catId = Number(req.query.catId)
    const conId = Number(req.query.conId)
    const keywords = String(req.query.keywords)

    const listing = await db.searchAllListings(catId, conId, keywords)
    res.json(listing)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/', async (req, res) => {
  try {
    const listings = await db.getAllListings()
    res.json(listings)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

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

router.patch('/:id', async (req, res) => {
  try {
    // TODO add auth checks to ensure only the owner can update
    const listingId = Number(req.params.id)
    const listingData = { ...req.body, id: listingId }
    const updatedListing = await db.updateListing(listingData)
    res.json(updatedListing)
  } catch (error) {
    console.error(error)
    res.status(500).send('something went wrong')
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
