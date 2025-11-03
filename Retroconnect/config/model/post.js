const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, trim: true },
  location: { type: String, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Text index to support simple keyword search across title and content
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);


