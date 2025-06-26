const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { saveChat, getChatHistory } = require('../controllers/chatController');

// Apply auth middleware to all chat routes
router.use(authMiddleware);

// POST /api/chat - Save a chat message
router.post('/', saveChat);

// GET /api/chat/history - Get chat history
router.get('/history', getChatHistory);

module.exports = router;