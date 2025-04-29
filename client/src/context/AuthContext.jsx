import React, { createContext, useContext, useState, useEffect } from "react";
import axios from '../api/axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      //check if user info exists in localStorage
      const storedUser = localStorage.getItem("user");
      // console.log("Stored userin AuthContext:", storedUser); // Debugging log
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }else {
        try {
          const token = localStorage.getItem('token')
          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const res = await axios.get("/auth/me", config);
            setUser(res.data)
          }
        }catch(err) {
          console.error('Error fetching user:', err)
        }
      }
      setLoading(false) //set loading to false after fetching user
    }
    fetchUser();
  }, []);

  const login = (userData) => {
    // console.log("User data in login:", userData);
    setUser(userData.user);
    localStorage.setItem('token', userData.token)
    localStorage.setItem("user", JSON.stringify(userData.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem('token')
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>  useContext(AuthContext);

