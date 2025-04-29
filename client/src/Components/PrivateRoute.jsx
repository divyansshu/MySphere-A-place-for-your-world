import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth()
//   console.log('User in PrivateRoute:', user)
//   console.log("Loading state in PrivateRoute:", loading)

  //wait until loading is complete
  if (loading) {
    return <div>Loading....</div>
  }

  // If user is not logged in, redirect to the login page
  if (!user) {
    //  console.log("Redirecting to login because user is:", user);
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child component
  return children;
}

export default PrivateRoute