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

//change made of parameter to authId from auth0Id to match table - Joel
//removed columns not provided in auth0 signin ie. username - Joel
//removed alt email address - will insert as null if any issue
router.post('/sync', async (req, res) => {
  console.log('Received body:', req.body)

  try {
    const { authId, email } = req.body

    if (!authId) {
      return res.status(400).json({ error: 'authId is required' })
    }

    console.log('Looking for user:', authId)

    let user = await db.getUserByAuthId(authId)

    if (!user) {
      console.log('Creating new user')
      user = await db.createUser({
        authId,
        email: email,
      })
    }

    res.json(user)
  } catch (error) {
    console.error('Sync error:', error)
    res.status(500).json({ error: 'Error syncing user' })
  }
})

router.get('/check', async (req, res) => {
  try {
    const authId = String(req.query.authId)
    const userProfile = await db.checkUserInDatabase(authId)
    res.send(userProfile)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
