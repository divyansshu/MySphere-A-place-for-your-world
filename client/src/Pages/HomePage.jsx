import React from 'react'
import TrendingTags from "../Components/TrendingTags";
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

    const onTagClick = (selectedTag) => {
      navigate(`/explore/${selectedTag}`); // Navigate to the Explore page with the selected tag
    };
  
    return (
      <div className="page-wrapper">
        <div className="home-container">
          <h1>Welcome to the social Media App</h1>
          <TrendingTags onTagClick={onTagClick} />
        </div>
      </div>
    );
}
export default HomePage
