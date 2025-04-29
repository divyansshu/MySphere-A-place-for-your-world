import React, {useEffect, useState} from 'react'
import axios from '../api/axios'
import {useAuth} from '../context/AuthContext'
import PostCard from '../Components/PostCard'

const Feed = () => {
    const [posts, setPosts] = useState([])
    // const {logout} = useAuth()

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const res = await axios.get('/posts')
                setPosts(res.data)
            }catch(err) {
                console.error(err)
            }
        }
        fetchFeed()
    }, [])

    return (
      <div className="page-wrapper">
        <div className="feed-container">
          <h2>Feed</h2>
          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            <div className="feed-posts">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} disableVote={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
}


export default Feed