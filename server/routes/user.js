import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post('/api/auth/register', async (req, res) => {
    const {username, email, password} = req.body
    try {
        const newUser = new User({username, email, password})
        await newUser.save()
        res.status(201).json({message: 'User registered Successfully'})
    }catch(error) {
        res.status(400).json({error: 'User already exists'})
    }
})

router.post('/api/auth/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await user.findOne({email})
        if(!user) return res.status(404).json({error: 'User not found'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({error: 'Invalid Credentials'})

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})    
        res.json({token})
    }catch(error) {
        res.status(500).json({error: 'server error'})
    }
})

export default router