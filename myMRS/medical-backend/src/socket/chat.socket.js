import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";

// Chat Socket.IO logic
export default function chatSocket(io) {

  // JWT Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Save payload on socket
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  // Socket connection
  io.on("connection", (socket) => {
    console.log("User connected:", socket.user?._id);

    // Join a room
    socket.on("join_room", (roomId) => {
      if (!roomId) return;
      socket.join(roomId);
    });

    // Send message
    socket.on("send_message", async (data) => {
      try {
        const { roomId, content } = data;

        if (!roomId || !content) return;

        const message = await Message.create({
          sender: socket.user?._id,
          chatId: roomId,
          content,
        });

        io.to(roomId.toString()).emit("receive_message", message);

      } catch (error) {
        console.error("Message error:", error);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user?._id);
    });
  });
}