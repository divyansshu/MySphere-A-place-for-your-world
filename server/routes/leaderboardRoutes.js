import express from 'express'
const router = express.Router()
import Post from '../models/Post.js'

router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await Post.aggregate([
            {
                $group: {
                    _id: "$uploader", // Group by uploader (user)
                    totalVotes: { $sum: "$voteCount" }, // Sum up voteCount
                    totalLikes: { $sum: { $size: "$likes" } }, // Count the number of likes
                },
            },
            {
                $lookup: {
                    from: "users", // Reference the User collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user", // Unwind the user array to get a single object
            },
            {
                $project: {
                    _id: 0,
                    username: "$user.username",
                    totalVotes: 1,
                    totalLikes: 1,
                },
            },
            {
                $sort: { totalVotes: -1, totalLikes: -1 }, // Sort by votes, then likes
            },
            {
                $limit: 5, // Limit to top 10 users
            },
        ]);

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

export default router