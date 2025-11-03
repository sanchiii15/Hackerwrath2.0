import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function PostCard({ post, onOfferHelp, onChat }) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvotes(upvotes - 1);
      setUpvoted(false);
      toast.success("Upvote removed!");
    } else {
      setUpvotes(upvotes + 1);
      setUpvoted(true);
      toast.success("Post upvoted!");
    }
  };

  const handleOfferHelp = () => {
    if (onOfferHelp) {
      onOfferHelp(post);
    }
    toast.success("Help offered! 🤝");
  };

  const handleChat = () => {
    if (onChat) {
      onChat(post);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "complaint":
        return "text-retroRed";
      case "help":
        return "text-retroYellow";
      case "thought":
        return "text-retroCyan";
      default:
        return "text-white";
    }
  };

  const getTypeEmoji = (type) => {
    switch (type) {
      case "complaint":
        return "⚠️";
      case "help":
        return "🆘";
      case "thought":
        return "💭";
      default:
        return "📝";
    }
  };

  return (
    <div className="retro-card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="text-lg mr-2">{getTypeEmoji(post.type)}</span>
          <span className={`font-pixel text-sm ${getTypeColor(post.type)}`}>
            {post.type.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleUpvote}
            className={`mr-2 px-2 py-1 rounded text-xs font-pixel transition ${
              upvoted
                ? "bg-retroYellow text-black"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            ▲ {upvotes}
          </button>
        </div>
      </div>

      <h3 className="font-pixel text-retroYellow text-sm mb-2">{post.title}</h3>
      <p className="text-gray-300 text-xs mb-4 leading-relaxed">{post.desc}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-400">
          <span className="mr-1">📍</span>
          <span>{post.location}</span>
        </div>

        <div className="flex space-x-2">
          {post.type === "help" && (
            <button
              onClick={handleOfferHelp}
              className="px-3 py-1 bg-retroGreen text-white text-xs font-pixel rounded hover:bg-green-600 transition"
            >
              OFFER HELP
            </button>
          )}
          {(post.type === "complaint" || post.type === "help") && (
            <button
              onClick={handleChat}
              className="px-3 py-1 bg-retroPurple text-white text-xs font-pixel rounded hover:bg-purple-700 transition"
            >
              CHAT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
