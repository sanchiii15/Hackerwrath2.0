const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    complaintId: { type: String, required: true },
    mockUserId: { type: String, required: true, default: 'user123' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);


