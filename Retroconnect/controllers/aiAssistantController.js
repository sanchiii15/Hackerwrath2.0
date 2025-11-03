const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { generateAIResponse } = require('../services/geminiService');

// POST /api/ai/chat/start { complaintId }
const startChat = async (req, res) => {
  try {
    const { complaintId } = req.body || {};
    if (!complaintId) {
      return res.status(400).json({ message: 'complaintId is required' });
    }

    const conversation = await Conversation.create({ complaintId, mockUserId: 'user123' });

    const systemText = 'You are the AI Community Assistant. Help the user with practical steps, safety tips, and whom to contact for the reported issue. Keep responses short and actionable.';
    const systemMsg = await Message.create({ conversationId: conversation._id, role: 'system', text: systemText });

    const assistantIntroText = await generateAIResponse([
      { role: 'system', text: systemText },
      { role: 'user', text: 'We are starting a chat about a community complaint. Introduce yourself briefly and ask one clarifying question.' }
    ]);

    const assistantMsg = await Message.create({ conversationId: conversation._id, role: 'assistant', text: assistantIntroText });

    return res.status(201).json({ conversationId: conversation._id, assistantIntro: assistantMsg.text });
  } catch (err) {
    return res.status(500).json({ message: 'AI is unavailable right now, please try later.' });
  }
};

// POST /api/ai/chat/:conversationId/message { text }
const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body || {};
    if (!text || String(text).length > 300) {
      return res.status(400).json({ message: 'text is required and max 300 chars' });
    }

    const convo = await Conversation.findById(conversationId);
    if (!convo || convo.status !== 'open') {
      return res.status(404).json({ message: 'Conversation not found or closed' });
    }

    await Message.create({ conversationId, role: 'user', text });

    // Fetch recent history (last 12 messages)
    const history = await Message.find({ conversationId }).sort({ createdAt: 1 }).limit(12);
    const messages = history.map(m => ({ role: m.role, text: m.text }));

    const aiText = await generateAIResponse(messages);
    const assistant = await Message.create({ conversationId, role: 'assistant', text: aiText });

    return res.json({ message: 'ok', reply: assistant.text });
  } catch (err) {
    return res.status(500).json({ message: 'AI is unavailable right now, please try later.' });
  }
};

// GET /api/ai/chat/:conversationId
const getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return res.json({ messages });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to load conversation' });
  }
};

// POST /api/ai/chat/:conversationId/close
const closeConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const convo = await Conversation.findByIdAndUpdate(conversationId, { status: 'closed' }, { new: true });
    if (!convo) return res.status(404).json({ message: 'Conversation not found' });
    return res.json({ message: 'Conversation closed' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to close conversation' });
  }
};

module.exports = { startChat, sendMessage, getConversation, closeConversation };


