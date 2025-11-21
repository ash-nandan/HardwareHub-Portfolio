import express from 'express'
import * as db from '../db/users'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const userListings = await db.getListingsByUser(userId)
    res.json(userListings)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
