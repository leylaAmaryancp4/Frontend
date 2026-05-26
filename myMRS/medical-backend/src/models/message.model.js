import { Schema, model } from 'mongoose';
import { Chat } from './chat.model.js';
import { User } from './user.model.js';

// Message schema
const MessageSchema = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, ref: Chat, required: true },
    sender: { type: Schema.Types.ObjectId, ref: User, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Create model
const Message = model('Message', MessageSchema);

export default Message;