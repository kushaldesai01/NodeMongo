import { Server, Socket } from "socket.io";
import http from "http";
import { userModel } from "../modules/user/userModel";
import mongoose from "mongoose";

export const socketHandler = (server: http.Server): Server => {
  const io = new Server(server);

  io.on("connection", async (socket: Socket) => {
    // console.log("New client connected", socket.handshake.query.user_id);
    console.log("New client connected", socket.id);

    socket.on("register", async (userID: string) => {
      try {
        if (!mongoose.isValidObjectId(userID)) {
          return socket.emit("register", `Error occurred while registering user-id: ${userID}`);
        }
        const checkID = await userModel.countDocuments({ _id: userID });
        if(checkID < 1){
          return socket.emit("register", `Error occurred while registering user-id: ${userID}`);
        }
        await userModel.updateOne({ _id: userID }, { $set: { socket_id: socket.id } });
        socket.emit("register", `${userID} registered successfully`);
      } catch (error) {
        socket.emit("register", `Error occurred while registering user-id: ${userID}`);
      }
    });

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
