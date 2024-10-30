// src/socketHandler.ts

import { Server, Socket } from "socket.io";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    // Handle incoming messages
    socket.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      // Echo the message back to the client
      socket.emit("message", `You said: ${message}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
