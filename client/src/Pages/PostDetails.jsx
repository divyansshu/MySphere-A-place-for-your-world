import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const PostDetails = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const [post, setPost] = useState(null);

  const fetchPost = async (postId) => {
    try {
      const res = await axios.get(`/posts/${postId}`);
      setPost(res.data); // Set the fetched post data
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost(postId); // Fetch the post when the component mounts
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-details">
      <img src={`http://localhost:5000/${post.imageUrl}`} alt={post.caption} />
      <h2>{post.caption}</h2>
      <p>Tags: {post.tags.join(", ")}</p>
      <p>
        <strong>Likes:</strong> {post.likes.length}
      </p>
      <p>
        <strong>Votes:</strong> {post.voteCount}
      </p>
      <h3>Comments</h3>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.user?.username || "Anonymous"}:</strong>{" "}
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
