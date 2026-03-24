import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import chatSocket from "./socket/chat.socket.js";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create HTTP server with Express app
    const server = http.createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    // Attach socket logic
    chatSocket(io);

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message || error);
    process.exit(1);
  }
};

startServer();