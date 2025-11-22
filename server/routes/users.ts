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

router.post('/sync', async (req, res) => {
  try {
    const { auth0Id, name, email } = req.body
    const user = await db.getUserByAuthId(auth0Id)

    if (!user) {
      const newUser = await db.createUser(auth0Id, name, email)
      return res.json(newUser)
    }
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})

export default router
