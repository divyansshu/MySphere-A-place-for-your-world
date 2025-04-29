import express from 'express'
import Post from '../models/Post.js'
import Vote from '../models/Vote.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

//GET /api/vote/:tag
router.get('/:tag',authenticate, async (req, res) => {
    const { tag } = req.params
    console.log('Tag received: ', tag)
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    tags: { $regex: new RegExp(`^#?${tag}$`, "i") }, // Match with or without '#' and case-insensitive
                },
            },
        ]);
        console.log('Posts fetched: ', posts)

        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: "No posts found for this tag" });
        }
        
        res.status(200).json(posts)
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Error fetching posts" })
    }
})

//POST /api/vote
router.post('/', authenticate, async (req, res) => {
     console.log("Request body:", req.body); // Debugging log
    const { postId, tag } = req.body;
    const userId = req.user.id

    if (!postId || !tag) {
        console.error("Missing postId or tag in request body");
        return res.status(400).json({ error: "Post ID and tag are required" });
    }

    try {

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already voted
        if (post.votedBy.includes(userId)) {
            return res.status(400).json({ error: 'You have already voted on this post' });
        }
        try{
            //log the vote
            await Vote.create({ user: userId, post: postId, tag })
        }catch(err) {
            console.error("Error logging vote:", err);
            return res.status(500).json({ error: "Failed to log vote" });
        }

        //increment the vote count and add the user to the votedBy list
        post.voteCount += 1
        post.votedBy.push(userId)

        await post.save()
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: 'Voting failed', error })
    }
})

export default router