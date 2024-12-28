import { Server, Socket } from "socket.io";
import http from "http";
import { userModel } from "../modules/user/userModel";
import mongoose from "mongoose";

export const socketHandler = (server: http.Server): Server => {
  const io = new Server(server);

  io.on("connection", async (socket: Socket) => {
    console.log("New client connected", socket.handshake.query.user_id);
    // let a = mongoose.Types.ObjectId(socket.handshake.query.user_id)
    // console.log("aaa", typeof socket.handshake.query.user_id)
    await userModel.updateOne({ _id: socket.handshake.query.user_id }, { $set: { socket_id: socket.id } });
    // socket.on("register", async (userID: string) => {
    //   socket.emit("register", `${userID} registered successfully`);
    // });

    socket.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      socket.emit("message", `You said: ${message}`);
    });

    socket.on("disconnect", async () => {
      await userModel.updateOne({ socket_id: socket.id }, { $set: { socket_id: "" } });
      console.log(`Client disconnected, ${socket.id} removed successfully`);
    });
  });

  return io;
};
