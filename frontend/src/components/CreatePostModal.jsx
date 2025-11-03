import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function CreatePostModal({ type, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.desc.trim() || !formData.location.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    onSubmit(formData);
    setFormData({ title: "", desc: "", location: "" });
  };

  const getTypeInfo = (type) => {
    switch (type) {
      case "complaint":
        return {
          title: "New Complaint",
          emoji: "⚠️",
          color: "text-retroRed",
          placeholder: "Describe the issue you're facing..."
        };
      case "help":
        return {
          title: "Ask for Help",
          emoji: "🆘",
          color: "text-retroYellow",
          placeholder: "What do you need help with?"
        };
      case "thought":
        return {
          title: "Share a Thought",
          emoji: "💭",
          color: "text-retroCyan",
          placeholder: "What's on your mind?"
        };
      default:
        return {
          title: "New Post",
          emoji: "📝",
          color: "text-white",
          placeholder: "Write something..."
        };
    }
  };

  const typeInfo = getTypeInfo(type);

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="modal-content w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`font-pixel text-lg ${typeInfo.color}`}>
            {typeInfo.emoji} {typeInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="text-retroRed hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              TITLE
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              className="retro-input w-full"
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              DESCRIPTION
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder={typeInfo.placeholder}
              className="retro-input w-full h-24 resize-none"
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-retroYellow font-pixel text-xs mb-2">
              LOCATION
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where is this happening?"
              className="retro-input w-full"
              maxLength={30}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white font-pixel text-xs rounded hover:bg-gray-600 transition"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 retro-button"
            >
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
