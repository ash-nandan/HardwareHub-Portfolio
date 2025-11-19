import express from 'express'
import * as db from '../db/categories'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await db.getAllCategories()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
