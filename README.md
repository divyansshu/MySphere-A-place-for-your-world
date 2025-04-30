# MERN Social Media App

A full-stack social media application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This project demonstrates the implementation of a modern, responsive web app with key social features like user authentication, image uploads, post voting, trending tags, and more.

---

## ✨ Features

## 🔹 Frontend
- Developed using React and Vite for blazing-fast performance.
- Client-side routing using react-router-dom.
- Toast notifications using react-toastify for user feedback.
- Beautiful UI elements with react-icons.
- Dynamic leaderboard showcasing top users based on votes and likes.
- Voting system where users can vote on posts based on tags.
- Profile page with editable user bio and profile picture upload.

## 🔹 Backend
- Powered by Node.js and Express.js for a robust server-side framework.
- Secure login system with jsonwebtoken and bcryptjs.
- Handles image uploads using multer and serves static files.
- Environment variables configured using dotenv for secure configuration.
- MongoDB database integration using mongoose for data storage.
- RESTful API endpoints for authentication, posts, voting, and trending tags.
- Leaderboard API to fetch top users based on votes and likes.

## 🔐 Authentication
- Users can sign up and log in securely.
- JWT is used for session management and user authentication.
- Passwords are hashed using bcrypt for secure storage.
- Protected routes to ensure only authenticated users can access certain features.

## 🔹 Additional Features
- Trending Tags: Displays the most popular tags based on user activity.
- Post Management: Users can upload, view, and interact with posts.
- Voting System: Users can vote on one post per tag, ensuring fair participation.
- Error Handling: Comprehensive error handling for both frontend and backend.

## 🔹 Database
- Uses **MongoDB** as the database.
- Managed and modeled via **Mongoose** for seamless integration.

---

## 🚀 Live Demo

> Coming Soon — Will be hosted on platforms like **Render**, **Vercel**, or **Netlify**.

---

## Screenshots

![Screenshot 2025-04-30 221617](https://github.com/user-attachments/assets/15a1b357-4aec-4a85-954e-55134b0d42a6)

![Screenshot 2025-04-30 221910](https://github.com/user-attachments/assets/fdb17c28-895f-43c5-b7e2-90ad03541b1d)

![Screenshot 2025-04-30 222115](https://github.com/user-attachments/assets/b69f524c-ed93-481f-9550-a25dfb1b10f3)

![Screenshot 2025-04-30 222204](https://github.com/user-attachments/assets/eb367c3a-3ad1-4d1f-bf76-c980ba791327)

![Screenshot 2025-04-30 222222](https://github.com/user-attachments/assets/806504d3-509d-49f4-ab13-b4914079d04b)

![Screenshot 2025-04-30 222415](https://github.com/user-attachments/assets/6371280b-dc98-41ea-8a12-d2c5b8b9c336)

## 📌 Prerequisites
- Node.js (v16 or above)
- MongoDB (running locally or cloud-based like Atlas)

## 📦 Clone the Repository
```bash
git clone https://github.com/divyansshu/MERN-Social-Media-App.git
cd social-media-app
```

## 🛠️ Installation and Setup
# Install frontend dependencies
```
cd client
npm install
```

# Install backend dependencies
```
cd ../server
npm install
```
## ⚙️ Environment Variables
Create a .env file inside the /server directory and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## ▶️ Running the App
### Start backend server
```
cd server
npm run dev
```
### Start frontend app (in a new terminal)
```
cd client
npm run dev
```

### Folder Structure
```
social-media-app/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── Components/
│   │   │   ├── LogoutButton.jsx
│   │   │   ├── ModalComponent.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── TrendingTags.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── Pages/
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PostDetails.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── UploadPost.jsx
│   │   │   └── VotePage.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   └── trendingController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Post.js
│   │   ├── User.js
│   │   └── Vote.js
│   ├── public/
│   │   └── profile_pic.jpg
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leaderboardRoutes.js
│   │   ├── postRoutes.js
│   │   ├── trendingRoutes.js
│   │   └── vote.js
│   ├── uploads/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
```


