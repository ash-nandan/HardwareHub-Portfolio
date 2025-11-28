import express from 'express'
import * as db from '../db/conditions'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const conditions = await db.getAllConditions()
    res.json(conditions)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
