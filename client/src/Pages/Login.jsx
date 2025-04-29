import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

const Login = () => {
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      // console.log('Login response:', response.data)
      login(response.data) //pass the user data to the login function
      alert("Login successful!");
      navigate("/Feed");
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };
  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          New user? <Link to="/signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
