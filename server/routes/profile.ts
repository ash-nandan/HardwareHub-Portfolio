import express from 'express'
import * as db from '../db/profile'
import multer from 'multer'

const router = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop()
      cb(null, `profile-${req.params.id}-${Date.now()}.${ext}`)
    },
  }),
})

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

router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    const updated = await db.updateProfile(id, { image_url: req.file.filename })
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to upload image' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const deletedCount = await db.deleteProfile(id)
    if (!deletedCount) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    return res.sendStatus(204)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to delete profile' })
  }
})

export default router
