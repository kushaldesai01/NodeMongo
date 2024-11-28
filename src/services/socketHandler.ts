import { Server, Socket } from 'socket.io';
import http from 'http';

export const socketHandler = (server: http.Server): Server => {
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    socket.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      socket.emit("message", `You said: ${message}`);
    });
    
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};
