import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { dummyPosts } from "../utils/dummyData";
import { toast } from "react-hot-toast";

export default function Home() {
  const [posts] = useState(dummyPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleOfferHelp = (post) => {
    toast.success(`You offered to help with "${post.title}"! 🤝`);
  };

  const handleChat = (post) => {
    setSelectedPost(post);
    setShowChatModal(true);
  };

  const getRecentPosts = () => {
    return posts.slice(0, 6); // Show only 6 most recent posts
  };

  const getStats = () => {
    return {
      complaints: posts.filter(p => p.type === "complaint").length,
      helpRequests: posts.filter(p => p.type === "help").length,
      thoughts: posts.filter(p => p.type === "thought").length,
      totalPosts: posts.length
    };
  };

  const stats = getStats();

  return (
    <div className="p-6 bg-black min-h-screen font-pixel text-white">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-retroYellow text-2xl mb-4">
          🎮 Welcome to CampusVerse
        </h1>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto">
          Your retro-themed campus community platform. Post complaints, ask for help, 
          share thoughts, and connect with fellow students!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="retro-card text-center">
          <div className="text-retroRed text-xl mb-2">⚠️</div>
          <div className="text-retroRed font-pixel text-lg">{stats.complaints}</div>
          <div className="text-gray-400 text-xs">Complaints</div>
        </div>
        
        <div className="retro-card text-center">
          <div className="text-retroYellow text-xl mb-2">🆘</div>
          <div className="text-retroYellow font-pixel text-lg">{stats.helpRequests}</div>
          <div className="text-gray-400 text-xs">Help Requests</div>
        </div>
        
        <div className="retro-card text-center">
          <div className="text-retroCyan text-xl mb-2">💭</div>
          <div className="text-retroCyan font-pixel text-lg">{stats.thoughts}</div>
          <div className="text-gray-400 text-xs">Thoughts</div>
        </div>
        
        <div className="retro-card text-center">
          <div className="text-retroGreen text-xl mb-2">📊</div>
          <div className="text-retroGreen font-pixel text-lg">{stats.totalPosts}</div>
          <div className="text-gray-400 text-xs">Total Posts</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Link to="/complaints" className="retro-card hover:transform hover:scale-105 transition-all">
          <div className="text-center">
            <div className="text-retroRed text-2xl mb-2">⚠️</div>
            <h3 className="font-pixel text-retroRed text-sm mb-2">Report Issue</h3>
            <p className="text-gray-400 text-xs">
              Found a problem on campus? Let everyone know!
            </p>
          </div>
        </Link>
        
        <Link to="/help" className="retro-card hover:transform hover:scale-105 transition-all">
          <div className="text-center">
            <div className="text-retroYellow text-2xl mb-2">🆘</div>
            <h3 className="font-pixel text-retroYellow text-sm mb-2">Get Help</h3>
            <p className="text-gray-400 text-xs">
              Need assistance? Ask the community for help!
            </p>
          </div>
        </Link>
        
        <Link to="/thoughts" className="retro-card hover:transform hover:scale-105 transition-all">
          <div className="text-center">
            <div className="text-retroCyan text-2xl mb-2">💭</div>
            <h3 className="font-pixel text-retroCyan text-sm mb-2">Share Ideas</h3>
            <p className="text-gray-400 text-xs">
              Got something on your mind? Share your thoughts!
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-retroYellow text-lg font-pixel">Recent Activity 🔥</h2>
          <div className="flex space-x-2 text-xs">
            <Link to="/complaints" className="text-retroRed hover:text-red-400">View All Complaints</Link>
            <span className="text-gray-500">|</span>
            <Link to="/help" className="text-retroYellow hover:text-yellow-400">View All Help</Link>
            <span className="text-gray-500">|</span>
            <Link to="/thoughts" className="text-retroCyan hover:text-cyan-400">View All Thoughts</Link>
          </div>
        </div>
        
        {getRecentPosts().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-retroYellow text-lg mb-2">Welcome to CampusVerse!</h3>
            <p className="text-gray-400 text-sm">
              Be the first to post something and get the community started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getRecentPosts().map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onOfferHelp={handleOfferHelp}
                onChat={handleChat}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedPost && (
        <ChatModal
          post={selectedPost}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  );
}

// Simple Chat Modal Component
function ChatModal({ post, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! I saw your ${post.type} about "${post.title}". How can I help?`, sender: "other", timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "own",
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I appreciate your interest.",
        "Let me know if you need any more details about this.",
        "I'm happy to discuss this further with you.",
        "Feel free to ask me anything about this topic!"
      ];
      const response = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="modal-content w-full max-w-2xl mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-pixel text-retroYellow text-lg">
            Chat about: {post.title}
          </h2>
          <button
            onClick={onClose}
            className="text-retroRed hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="chat-container mb-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`chat-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="retro-input flex-1"
          />
          <button type="submit" className="retro-button">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
