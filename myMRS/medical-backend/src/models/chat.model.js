import { Schema, model } from 'mongoose';
import { RecordRequest } from './recordRequest.model.js';

// Chat schema
const ChatSchema = new Schema(
  {
    recordRequest: { type: Schema.Types.ObjectId, ref: RecordRequest, required: true },
  },
  { timestamps: true }
);

// Create model
const Chat = model('Chat', ChatSchema);

export { Chat };