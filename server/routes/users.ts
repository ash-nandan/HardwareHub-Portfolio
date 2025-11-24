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
  console.log('Received body:', req.body)

  try {
    const { auth0_id, name, email } = req.body

    if (!auth0_id) {
      return res.status(400).json({ error: 'auth0_id is required' })
    }

    console.log('Looking for user:', auth0_id)

    let user = await db.getUserByAuthId(auth0_id)

    if (!user) {
      console.log('Creating new user')
      user = await db.createUser({
        auth0_id,
        username: name || 'User',
        email: email || 'no-email@example.com',
      })
    }

    res.json(user)
  } catch (error) {
    console.error('Sync error:', error)
    res
      .status(500)
      .json({ error: 'Error syncing user', details: error.message })
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
