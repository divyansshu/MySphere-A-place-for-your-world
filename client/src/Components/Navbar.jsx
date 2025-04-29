import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from '../Components/LogoutButton'

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Social Voting App</h1>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/feed" style={styles.link}>
            Feed
          </Link>
        </li>
        <li>
          <Link to="/explore" style={styles.link}>
            Explore
          </Link>
        </li>
        <li>
          <Link to="/upload" style={styles.link}>
            Upload
          </Link>
        </li>
        <li>
          <Link to="/vote" style={styles.link}>
            Vote
          </Link>
        </li>
        <li>
          <Link to="/profile" style={styles.link}>
            Profile
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;
