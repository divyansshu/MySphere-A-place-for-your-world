import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios"; // Ensure axios is imported
import { toast } from "react-toastify"; // Optional: For error notifications
import { useNavigate } from "react-router-dom";

function PostCard({ post, disableVote = false }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  // Local state for likes and votes
  const [hasLiked, setHasLiked] = useState(post.likes.includes(user._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [votesCount, setVotesCount] = useState(post.voteCount || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handlePhotoClick = () => {
    navigate(`/posts/${post._id}`);
  };

  //add comment functionality
  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      };

      console.log("Request payload: ", { text: commentText });

      const res = await axios.post(
        `/posts/${post._id}/comment`,
        { text: commentText },
        config
      );
      setComments([...comments, res.data.comment]); // Add the new comment to the list
      setCommentText(""); //clear the input field
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  // Toggle Like Functionality
  const toggleLike = async () => {
    const endpoint = hasLiked
      ? `/posts/${post._id}/unlike`
      : `/posts/${post._id}/like`;

    // Optimistic UI update
    setHasLiked(!hasLiked);
    setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      };
      await axios.post(endpoint, {}, config);
    } catch (error) {
      // Revert UI changes if the API call fails
      setHasLiked(hasLiked);
      setLikesCount((prev) => (hasLiked ? prev + 1 : prev - 1));
      console.error("Error toggling like:", error);
      toast.error("Failed to update like. Please try again."); // Optional: Show error notification
    }
  };

  return (
    <div className="page-wrapper">
      <div className="post-card">
        {/* Post Details */}
        <img
          src={`http://localhost:5000/${post.imageUrl}`}
          alt={post.caption}
          className="post-image"
          onClick={handlePhotoClick}
          style={{ cursor: "pointer" }}
        />
        <p className="post-caption">{post.caption}</p>
        <p className="post-tags">
          <strong>Tags:</strong> {post.tags.join(", ")}
        </p>
        <p className="post-votes">
          <strong>Votes:</strong> {votesCount}
        </p>

        {/* Like Button */}
        <button onClick={toggleLike}>
          {hasLiked ? "❤️ Unlike" : "🤍 Like"} ({likesCount})
        </button>
        {/* Conditionally Render Vote Button */}
        {!disableVote && <button>Vote ({votesCount})</button>}

        {/* Comments Section */}
        <div className="comments-section">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.user?.username || "Anonymous"}:</strong>{" "}
                {comment.text}
              </li>
            ))}
          </ul>
          <div className="add-comment">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={addComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
