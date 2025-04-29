import React, {useState} from 'react'
import axios from '../api/axios'
import {useNavigate, Link} from 'react-router-dom'

const Signup = () => {
    const [formData, setFormData] = useState({username: '', email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post('/auth/signup', formData)
            alert('Signup successful! Now login.')
            navigate('/login')
        }catch(err) {
            alert(err.response.data.message || 'Signup failed')
        }
    }
    return (
      <div className="page-wrapper">
        <div className="auth-container">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Signup</button>
          </form>
          <p>
            Already have an account?<Link to="/login"> Login here</Link>
          </p>
        </div>
      </div>
    );
}

export default Signup