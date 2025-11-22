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
    const { auth0Id, username, email } = req.body

    let user = await db.getUserByAuthId(auth0Id)

    if (!user) {
      user = await db.createUser({
        auth0Id,
        username,
        email,
      })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})
export default router
