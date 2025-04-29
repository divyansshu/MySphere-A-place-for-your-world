import React, {useState, useEffect} from "react";
import TrendingTags from "../Components/TrendingTags";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  const onTagClick = (selectedTag) => {
    navigate(`/explore/${selectedTag}`); // Navigate to the Explore page with the selected tag
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard: ", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="home-container">
        <h1>Welcome to the social Media App</h1>
        <TrendingTags onTagClick={onTagClick} />

        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard.map((user, index) => (
              <li key={index}>
                <span>
                  {index + 1}. {user.username}
                </span>
                <span>Votes: {user.totalVotes}</span>
                <span>Likes: {user.totalLikes}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
