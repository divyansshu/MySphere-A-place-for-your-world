import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import Modal from "../Components/ModalComponent";
import PostCard from '../Components/PostCard'

const ProfilePage = () => {
  const { user, setUser, loading } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(user)
    if (user) {
       console.log("User object in ProfilePage:", user);
      setBio(user.bio || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Token: ',  user.token)
      try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`/posts/user/${user._id}`, config);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || bio.trim() === "") {
      setMessage("Bio cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    //debugging log for the token
    const token = user.token
    console.log('Token being sent: ', token)

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.put("/auth/update-profile", formData, config);
      setUser((prev) => {
        const updatedUser = {
          ...prev,
          bio: res.data.bio,
          profilePic: res.data.profilePic,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
      setMessage("Profile updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err.response?.data || "Error updating profile");
      setMessage("Error updating profile");
    }
  };

    if (loading) {
      return <p>Loading profile...</p>;
    }

    if (!user) {
      return <p>No user data available.</p>;
    }

  return (
    <div className="page-wrapper">
      <div className="profile-page">
        <div className="profile-header">
              <img
                src={`http://localhost:5000/${user.profilePic}`}
                alt="Profile"
                className="profile-pic"
              />
              <h2>{user.username || user.email}</h2>
              <p>{user.bio || "No bio yet."}</p>
              <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Bio:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                cols="40"
              />
            </div>
            <div>
              <label>Profile Picture:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit">Save Changes</button>
          </form>
          {message && <p>{message}</p>}
        </Modal>

        <div className="my-posts">
          <h3>My Posts</h3>
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} disableVote={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
