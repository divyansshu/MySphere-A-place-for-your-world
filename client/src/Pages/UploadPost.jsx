import React, { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const UploadPost = () => {
  const { user } = useAuth();
  //   console.log('User in Upload Post: ', user)
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("null");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !caption || !tags) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("tags", tags);
      // Removed uploaderId from formData as backend extracts it from token
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log('formData: ', formData)
      // console.log('Config: ', config)

      const { data } = await axios.post("/posts/upload", formData, config);
      setMessage("Upload successful!");
      setCaption("");
      setTags("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Try again");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="upload-container">
        <h1>Upload a New Post</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated, e.g., #sunset, #beach)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
