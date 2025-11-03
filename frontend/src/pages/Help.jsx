import React, { useState } from "react";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import ChatModal from "../components/ChatModal";
import { dummyPosts } from "../utils/dummyData";
import { toast } from "react-hot-toast";

export default function Help() {
  const [posts, setPosts] = useState(dummyPosts.filter(p => p.type === "help"));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      type: "help",
      upvotes: 0,
      timestamp: new Date().toISOString()
    };
    setPosts([post, ...posts]);
    setShowCreateModal(false);
    toast.success("Help request posted successfully! 🆘");
  };

  const handleOfferHelp = (post) => {
    toast.success(`You offered to help with "${post.title}"! 🤝`);
    // Here you could add logic to notify the post author
  };

  const handleChat = (post) => {
    setSelectedPost(post);
    setShowChatModal(true);
  };

  return (
    <div className="p-6 bg-black min-h-screen font-pixel text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-retroYellow text-xl">Help Posts 🆘</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="retro-button"
        >
          + ASK FOR HELP
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤝</div>
          <h2 className="text-retroYellow text-lg mb-2">No Help Requests!</h2>
          <p className="text-gray-400 text-sm">
            Everyone seems to be doing great! Be the first to ask for help if you need it.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onOfferHelp={handleOfferHelp}
              onChat={handleChat}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreatePostModal
          type="help"
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
