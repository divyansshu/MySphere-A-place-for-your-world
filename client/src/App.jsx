import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from "./Pages/Feed";
import UploadPost from "./Pages/UploadPost";
import Explore from "./Pages/ExplorePage";
import VotingPage from "./Pages/VotePage";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage";
import PostDetails from "./Pages/PostDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" />
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <UploadPost />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore/:tag"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/:postId"
              element={
                <PrivateRoute>
                  <PostDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/vote"
              element={
                <PrivateRoute>
                  <VotingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/Home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
