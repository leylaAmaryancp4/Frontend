import { Chat } from '../models/chat.model.js';
import Message from '../models/message.model.js';
import { User } from '../models/user.model.js';

export const createChat = async (req, res) => {
  try {
    const { recordRequestId } = req.body;
    const chat = await Chat.create({ recordRequest: recordRequestId });
    res.status(201).json({ message: 'Chat created', chat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, content } = req.body;
    const message = await Message.create({ chatId, sender: senderId, content });
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

export const getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate('sender');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};