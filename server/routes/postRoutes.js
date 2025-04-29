import express from 'express'
import multer from 'multer'
import path from 'path'
import Post from '../models/Post.js'
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

//file storage Settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({storage})

//POST route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Extract uploaderId from the token
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is missing' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const uploaderId = decodedToken.id;

        // console.log('Decoded Token:', decodedToken); // Debugging log
        // console.log('Uploader ID:', uploaderId); // Debugging log
        
        const {caption, tags} = req.body
        const imagePath = req.file?.path

        if (!imagePath) {
            return res.status(400).json({ error: 'Image file is missing' });
        }

        if (!uploaderId) {
            return res.status(400).json({ error: 'Uploader ID is missing or invalid' });
        }

        //save post to database
        const post = new Post({
            imageUrl: imagePath,
            caption,
            tags: tags.split(',').map(tag => tag.trim()),
            uploader: uploaderId
        })
        await post.save()
        res.status(201).json({message: 'Post uploaded', post})
    }catch(error) {
        console.error('Error uploading post:', error)
        res.status(500).json({error: 'Failed to upload post'})
    }
})

router.get("/", async (req, res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(error) {
        console.error('Error fetching posts: ', error)
        res.status(500).json({error: 'Failed to fetch posts'})
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        // console.log('Fetching posts for user: ', req.params.userId)
        const posts = await Post.find({uploader: req.params.userId})
        // console.log('Posts: ', posts)
        res.status(200).json(posts)
    }catch(err) {
        console.error('Error fetching user posts: ', err)
        res.status(500).json({message: 'Error fetching posts'})
    }
})

router.get('/explore', async (req, res) => {
    try {
        const {tag} = req.query

        if(!tag || tag.trim() === '') {
            return res.status(400).json({error: 'Tag is required'})
        }

        const normalizedTag = tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`; // Ensure the tag starts with '#'

        const posts = await Post.find({tags: { $in: [normalizedTag]}}) //search post by tag
        res.status(200).json(posts)
    }catch(error) {
        console.error('Error fetching posts by tag:', error)
        res.status(500).json({error: 'Failed to fetch posts' })
    }
})

// Like a post
router.post("/:postId/like", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
        }

        res.status(200).json({ message: "Post liked", post });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Failed to like post" });
    }
});

// Unlike a post
router.post("/:postId/unlike", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        await post.save();

        res.status(200).json({ message: "Post unliked", post });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ message: "Failed to unlike post" });
    }
});

//get a single post by Id
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('comments.user', 'username')
        if(!post) {
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(200).json(post)
    }catch(err) {
        console.error('Error fetching post: ', err)
        res.status(500).json({error: 'Failed to fetch post'})
    }
})

//add a comment to a post
router.post("/:postId/comment", authMiddleware, async(req, res) => {
    const {postId} = req.params
    const {text} = req.body
    const userId = req.user._id

    if (!text || text.trim() === "") {
        return res.status(400).json({error: "Comment text is required"})
    }
    try {
        const post = await Post.findById(postId)
        if(!post) {
            return res.status(404).json({error: "post not found"})
        }

        const comment = {user: userId, text}
        post.comments.push(comment)
        await post.save()

        const populatedComment = await Post.findOne(
            {_id: postId},
            {comments: {$slice: -1}} // get only the last comment
        ).populate('comments.user', 'username')

        res.status(201).json({message: "Comment added", comment: populatedComment.comments[0]})
    }catch(err) {
        console.error('Error adding comment: ', err)
        res.status(500).json({error: "Failed to add comment"})
    }
})


export default router