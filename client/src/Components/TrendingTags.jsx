import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const TrendingTags = ({ onTagClick }) => {
  const [trendingFromPosts, setTrendingFromPosts] = useState([]);
  const [trendingFromVotes, setTrendingFromVotes] = useState([]);

  useEffect(() => {
    const fetchTrendingTags = async () => {
      try {
        const res = await axios.get("/trending");
        setTrendingFromPosts(res.data.trendingFromPosts);
        setTrendingFromVotes(res.data.trendingFromVotes);
      } catch (err) {
        console.error("Error fetching trending tags: ", err);
      }
    };
    fetchTrendingTags();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="trending-tags">
        <h2> Trending Tags</h2>

        {/* Trending Tags from Recent Posts */}
        <div className="trending-section">
          <h3>Based on Recent Posts</h3>
          <ul>
            {trendingFromPosts.map((tag, index) => (
              <li key={index} onClick={() => onTagClick(tag.tag)}>
                #{tag.tag} ({tag.count})
              </li>
            ))}
          </ul>
        </div>

        {/* Trending Tags from Votes */}
        <div className="trending-section">
          <h3>Based on Votes</h3>
          <ul>
            {trendingFromVotes.map((tag, index) => (
              <li key={index} onClick={() => onTagClick(tag.tag)}>
                #{tag.tag} ({tag.count})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendingTags;
