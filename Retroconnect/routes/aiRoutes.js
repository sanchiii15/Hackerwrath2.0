const express = require('express');
const { startChat, sendMessage, getConversation, closeConversation } = require('../controllers/aiAssistantController');

const router = express.Router();

router.post('/chat/start', startChat);
router.post('/chat/:conversationId/message', sendMessage);
router.get('/chat/:conversationId', getConversation);
router.post('/chat/:conversationId/close', closeConversation);

module.exports = router;


