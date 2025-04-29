import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.js' 
import postRoutes from './routes/postRoutes.js'
import voteRoutes from './routes/vote.js'
import trendingRoutes from './routes/trendingRoutes.js'

dotenv.config()
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/vote', voteRoutes)
app.use('/api/trending', trendingRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDb connected')
        app.listen(5000, () => console.log('Server running on port 5000'))
    }).catch((err) => console.error(err))