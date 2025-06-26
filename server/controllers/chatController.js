const Chat = require('../models/Chat');


const saveChat = async (req, res) => {
  try {
    const { message, response } = req.body;
    const userId = req.user.userId;

    if (!message || !response) {
      return res.status(400).json({ 
        success: false,
        message: 'Message and response are required' 
      });
    }

    const chat = new Chat({
      userId,
      message,
      response,
    });

    await chat.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Chat saved successfully',
      data: chat
    });
  } catch (error) {
    console.error('Save chat error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while saving chat' 
    });
  }
};

// Retrieve chat history for a user
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 50, page = 1 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const chats = await Chat.find({ userId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const totalChats = await Chat.countDocuments({ userId });
    
    res.json({
      success: true,
      data: chats,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalChats / limit),
        totalChats,
        hasMore: skip + chats.length < totalChats
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching chat history' 
    });
  }
};

module.exports = { saveChat, getChatHistory };