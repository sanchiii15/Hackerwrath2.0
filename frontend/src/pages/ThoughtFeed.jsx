import React, { useState } from "react";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { dummyPosts } from "../utils/dummyData";
import { toast } from "react-hot-toast";

export default function ThoughtFeed() {
  const [posts, setPosts] = useState(dummyPosts.filter(p => p.type === "thought"));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      type: "thought",
      upvotes: 0,
      timestamp: new Date().toISOString()
    };
    setPosts([post, ...posts]);
    setShowCreateModal(false);
    toast.success("Thought shared successfully! 💭");
  };

  const handleChat = (post) => {
    setSelectedPost(post);
    setShowChatModal(true);
  };

  return (
    <div className="p-6 bg-black min-h-screen font-pixel text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-retroCyan text-xl">Thoughts 💭</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="retro-button"
        >
          + SHARE THOUGHT
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="text-retroYellow text-lg mb-2">No Thoughts Yet!</h2>
          <p className="text-gray-400 text-sm">
            Share your ideas, experiences, or random thoughts with the community!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onChat={handleChat}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreatePostModal
          type="thought"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {showChatModal && selectedPost && (
        <ChatModal
          post={selectedPost}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  );
}

// Chat Modal Component for Thoughts
function ChatModal({ post, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: `Interesting thought about "${post.title}"! I'd love to discuss this further.`, sender: "other", timestamp: new Date() }
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

    // Simulate thoughtful responses
    setTimeout(() => {
      const responses = [
        "That's a really interesting perspective! I never thought of it that way.",
        "I have a different view on this. What made you think about it?",
        "This reminds me of something similar I experienced recently.",
        "Great point! Have you considered this angle as well?",
        "I'd love to hear more about your thoughts on this topic."
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
            Discussing: {post.title}
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
            placeholder="Share your thoughts..."
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
