import React, { useState, useEffect, useRef } from "react";
import { dummyUsers } from "../utils/dummyData";

export default function ChatModal({ post, onClose }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Hi! I saw your ${post.type} about "${post.title}". ${post.type === 'help' ? 'How can I help you?' : 'I have the same issue!'}`, 
      sender: "other", 
      timestamp: new Date(Date.now() - 300000),
      user: dummyUsers[1]
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "own",
      timestamp: new Date(),
      user: dummyUsers[0] // Current user
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate response with more contextual replies
    setTimeout(() => {
      const helpResponses = [
        "I can definitely help you with that! Let me know what specific assistance you need.",
        "I had the same problem before. Here's what worked for me...",
        "Have you tried checking with the administration? They might have a solution.",
        "I'm happy to help! When would be a good time to meet up?",
        "Let me share some resources that might be useful for you.",
        "I can lend you what you need. Where should we meet?"
      ];

      const complaintResponses = [
        "I've noticed the same issue! We should report this together.",
        "This has been bothering me too. Have you contacted the authorities?",
        "I completely agree with your complaint. Something needs to be done.",
        "I had a similar experience. Let's see if we can get this resolved.",
        "Thanks for bringing this up. I'll support your complaint.",
        "We should gather more people who have the same issue."
      ];

      const responses = post.type === "help" ? helpResponses : complaintResponses;
      const response = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: new Date(),
        user: dummyUsers[Math.floor(Math.random() * (dummyUsers.length - 1)) + 1]
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case "complaint": return "text-retroRed";
      case "help": return "text-retroYellow";
      case "thought": return "text-retroCyan";
      default: return "text-white";
    }
  };

  const getPostTypeEmoji = (type) => {
    switch (type) {
      case "complaint": return "⚠️";
      case "help": return "🆘";
      case "thought": return "💭";
      default: return "📝";
    }
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-start justify-center z-50 pt-4 pb-4">
      <div className="modal-content w-full max-w-4xl mx-4 p-6 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-600">
          <div>
            <h2 className={`font-pixel text-lg ${getPostTypeColor(post.type)} mb-2`}>
              {getPostTypeEmoji(post.type)} Chat about: {post.title}
            </h2>
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-1">📍</span>
              <span>{post.location}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{post.type}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-retroRed hover:text-red-400 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Post Preview */}
        <div className="bg-gray-800 rounded-lg p-3 mb-4 border border-gray-600">
          <p className="text-gray-300 text-sm">{post.desc}</p>
        </div>

        {/* Chat Messages */}
        <div className="chat-container flex-1 mb-4 overflow-y-auto min-h-[300px] max-h-[50vh]">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === 'own' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'own' ? 'order-2' : 'order-1'}`}>
                {/* User info */}
                <div className={`flex items-center mb-1 ${message.sender === 'own' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-400 mr-2">
                    {message.user?.avatar} {message.user?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {/* Message bubble */}
                <div
                  className={`chat-message ${message.sender} px-4 py-2 rounded-lg ${
                    message.sender === 'own' 
                      ? 'bg-retroPurple text-white' 
                      : 'bg-gray-700 text-gray-100 border border-retroCyan'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-700 border border-retroCyan rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-retroCyan rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-retroCyan rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-retroCyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="retro-input flex-1"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="retro-button"
            disabled={isTyping || !newMessage.trim()}
          >
            SEND
          </button>
        </form>

         {/* Quick Actions */}
         <div className="flex gap-2 mt-3">
           {post.type === "help" && (
             <button className="quick-action-btn px-3 py-1 bg-retroGreen text-white text-xs font-pixel rounded hover:bg-green-600 transition">
               OFFER HELP
             </button>
           )}
           <button className="quick-action-btn px-3 py-1 bg-retroYellow text-black text-xs font-pixel rounded hover:bg-yellow-500 transition">
             SHARE LOCATION
           </button>
           <button className="quick-action-btn px-3 py-1 bg-retroPink text-white text-xs font-pixel rounded hover:bg-pink-600 transition">
             REPORT POST
           </button>
         </div>
      </div>
    </div>
  );
}
