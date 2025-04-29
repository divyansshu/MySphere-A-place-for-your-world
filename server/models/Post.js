import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    imageUrl: String,
    caption: String,
    tags: {
        type: [String],
        set: (tags) => tags.map(tag => tag.toLowerCase()), // Normalize tags to lowercase
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    voteCount: {
        type: Number,
        default: 0
    },
    votedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            text: {type: String, required: true},
            createdAt: {type: Date, default: Date.now},
        },
    ],
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post