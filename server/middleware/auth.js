import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if(!token) return res.status(401).json({error: 'Access denied. No token provided'})
    
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select('-password')
            console.log(req.user)
            next()
        }catch(error) {
            res.status(400).json({error: 'Invalid Token'})
        }
}

export default authMiddleware