import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from '../api/axios'
import PostCard from '../Components/PostCard'
import TrendingTags from '../Components/TrendingTags'

const Explore = () => {
  const { tag: routeTag } = useParams(); // Get the tag from the URL
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (searchTag) => {
    const normalizedTag = searchTag.trim().replace(/^#/, "");
    if (!normalizedTag) {
      console.error("Tag is required");
      return;
    }
    try {
      const res = await axios.get(`/posts/explore?tag=${normalizedTag}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //fetch posts when the route changes
  useEffect(() => {
    if (routeTag) {
        fetchPosts(routeTag)
    }
  }, [routeTag])


  //fetch posts when searching by input
  const searchByTag = () => {
    fetchPosts(tag)
  }


  return (
    <div className="page-wrapper">
      <div className="explore-container">
        <h2>Explore</h2>

        {/* Trending Tags Section */}
        <div className="trending-tags">
          <TrendingTags onTagClick={(selectedTag) => fetchPosts(selectedTag)} />
        </div>

        {/* Search by Tag */}
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Search by tag"
        />
        <button onClick={searchByTag}>Search</button>

        {/* Posts Section */}
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="explore-posts">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} disableVote={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore