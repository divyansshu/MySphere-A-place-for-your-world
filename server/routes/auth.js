import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import authMiddleware from '../middleware/auth.js'
import multer from 'multer';
import path from 'path';


const router = express.Router()

router.post('/signup', async (req, res) => {

    const { username, email, password } = req.body

    //check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create and save user
    try {
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User registered Successfully' })
    } catch (error) {
        res.status(400).json({ error: 'User already exists' })
    }
})


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        //check if user exists
        const user = await User.findOne({ email }).select("username email bio profilePic");
        if (!user) return res.status(404).json({ error: 'User not found' })

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: 'Invalid Credentials' })

        //generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({
            message: 'Login Successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        })
    } catch (error) {
        res.status(500).json({ error: 'server error' })
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.put('/update-profile', authMiddleware, upload.single('profilePic'), async (req, res) => {
    console.log('Route handler reached')
    
    try {
        console.log('Request body:', req.body); // Debugging log
        console.log('Uploaded file:', req.file); // Debugging log

        const { bio } = req.body;
        const profilePic = req.file;

        if(!bio) {
            return res.status(400).json({error: 'Bio is required'})
        }

        if(!profilePic) {
            return res.status(400).json({error: 'Profile picture is required'})
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {bio, profilePic: profilePic.path},
            {new: true}
        )

        // const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
        res.status(200).json({bio: user.bio, profilePic: user.profilePic});
    } catch (err) {
        console.error('error updating profile: ', err);
        res.status(500).json({ error: 'Error updating profile' });
    }
});

router.put('/update-bio', authMiddleware, async (req, res) => {
    try {
        console.log('Authenticated user: ', req.user)
        const { bio } = req.body
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { bio },
            { new: true }
        )
        res.json({ bio: user.bio })
    }catch(err) {
        console.error(err)
        res.status(500).json({error: 'Error updating bio'})
    }
})


router.get('/me', authMiddleware, (req, res) => {
    res.json(req.user)
})

export default router