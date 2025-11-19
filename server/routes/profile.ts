import express from 'express'
import * as db from '../db/profile'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const profile = await db.getProfileById(id)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updated = await db.updateProfile(id, req.body)
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update profile' })
  }
})
export default router
