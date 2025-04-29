import Post from '../models/Post.js'
import Vote from '../models/Vote.js'

const getTrendingTags = async (req, res) => {
    try{
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

        //1. get trending tags from recent posts
        const recentPosts = await Post.find({createdAt: {$gte: oneDayAgo}})
        const postTagCounts = countTags(recentPosts.map(post => post.tags).flat())
        const trendingFromPosts = Object.entries(postTagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5) //top 5 tags

        //2. get trending tags from votes
        const recentVotes = await Vote.find({createdAt: {$gte: oneDayAgo}})
        const voteTagCounts = countTags(recentVotes.map(v => v.tag))
        const trendingFromVotes = Object.entries(voteTagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5) //top 5 tags
 
        //3. return both lists
        res.json({
            trendingFromPosts,
            trendingFromVotes
         })
    }catch(err) {
        console.error('Error fetching trending tags:', err)
        res.status(500).json({error: 'Server error'})
    }
}

// helper functions
const countTags = (tagsArray) => {
    const counts = {}
    tagsArray.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
    })
    return counts
}


export default getTrendingTags