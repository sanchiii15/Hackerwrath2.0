import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Aman Gupta",
      content: "Need a laptop charger urgently in Block B!",
      category: "Help Request",
      upvotes: 4,
    },
    {
      id: 2,
      user: "Priya Sharma",
      content: "Our hostel washroom needs urgent cleaning.",
      category: "Complaint",
      upvotes: 8,
    },
    {
      id: 3,
      user: "Rohan Mehta",
      content: "Lost my ID card near canteen, please DM if found.",
      category: "Lost & Found",
      upvotes: 2,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: posts.length + 1,
      user: "You",
      content: newPost,
      category: "Help Request",
      upvotes: 0,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleUpvote = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1 className="retro-heading">🕹️ Welcome to RetroConnect</h1>
        <p className="retro-sub">Your campus help & complaint board</p>

        <div className="create-post">
          <textarea
            placeholder="Share your issue or ask for help..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button onClick={addPost}>Post</button>
        </div>

        <div className="posts-section">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-user">{post.user}</span>
                <span className="post-category">{post.category}</span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleUpvote(post.id)}>⬆ {post.upvotes}</button>
                <button className="chat-btn">💬 Chat</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;