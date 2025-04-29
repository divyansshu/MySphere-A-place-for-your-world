import mongoose from 'mongoose'

const VoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    tag: String,
    createdAt: {
        type:Date, default: Date.now
    }
}, {timestamps: true})

const Vote = mongoose.model('Vote', VoteSchema)
export default Vote