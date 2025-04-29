import express from 'express'
const router = express.Router()
import getTrendingTags from '../controllers/trendingController.js'

router.get('/', getTrendingTags)
export default router