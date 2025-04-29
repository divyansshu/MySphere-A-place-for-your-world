import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const VotingPage = () => {
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);
  const [votedPostId, setVotedPostId] = useState(null);
  const { user } = useAuth(); // Get the user and token from AuthContext

  const fetchPostsForVoting = async () => {
    const normalizedTag = tag.trim().replace(/^#/, ""); // Remove leading '#' if present

    if (!normalizedTag) {
      console.error("Tag is required");
      return; // Prevent the request if the tag is empty
    }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Include the token in the request
          },
        };
        const res = await axios.get(`/vote/${normalizedTag}`, config);
        setPosts(res.data);
        setVotedPostId(null); // reset vote state
      } catch (err) {
        console.error("Error fetching posts:", err);
        if (err.response && err.response.status === 404) {
          toast.error("No posts found for this tag.");
        } else if (err.response && err.response.status === 500) {
          toast.error("Internal server error. Please try again later.");
        } else {
          toast.error("Failed to fetch posts. Please try again.");
        }
      }
  };

  const votePost = async (postId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      };
         const body = {
           postId, // Pass the postId
           tag, // Pass the tag (ensure this is set in the component state)
         };

          console.log("Request body:", body);

      const { data } = await axios.post(
        "/vote",
        body,
        config
      );
      // console.log('updated Post:', updatedPost)

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data._id ? data : post
        )
      );
      // setVotedPostId(postId);
      toast.success("Thank you for voting! 🎉");
    } catch (err) {
      if (
        err.response &&
        err.response.data.error === "You have already voted on this post"
      ) {
        toast.error("You have already voted on this post.");
      } else {
        console.error(err);
        toast.error("Failed to vote. Please try again.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="vote-container">
        <h2>Vote on Posts</h2>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag (e.g. sunset)"
        />
        <button onClick={fetchPostsForVoting}>Find Posts</button>

        <div className="vote-posts">
          {posts.map((post) => (
            <div key={post._id} className="vote-post-card">
              <img
                src={`http://localhost:5000/${post.imageUrl}`}
                alt="Post"
                className="vote-post-image"
              />
              <p>{post.caption}</p>
              <p>Tags: {post.tags.join(", ")}</p>
              <p>Votes: {post.voteCount || 0}</p>
              <button
                onClick={() => votePost(post._id)}
                disabled={post.votedBy?.includes(user.user.id)}
              >
                {post.votedBy?.includes(user.user.id) ? "Voted" : "Vote"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
