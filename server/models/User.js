import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: 'profile_pic.jpg' }, // Default assumes the file is in a public directory
    bio: { type: String, default: '' }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User