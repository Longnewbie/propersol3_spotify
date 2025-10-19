import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const userSockets = new Map(); // { userId: socket.id }
  const userActivities = new Map(); // { userId: activity }

  io.on("connection", (socket) => {
    // Lấy userId từ handshake.auth
    // Client đã gửi nó qua "socket.auth = { userId }"
    const userId = socket.handshake.auth.userId;

    // Nếu client kết nối mà không gửi userId, ngắt kết nối họ
    if (!userId) {
      console.log("Socket connection attempt without userId. Disconnecting.");
      return socket.disconnect();
    }

    // Lưu userId vào chính socket để dùng khi disconnect
    socket.userId = userId;

    // Thêm user vào các map
    userSockets.set(userId, socket.id);
    userActivities.set(userId, "Idle");

    // Gửi sự kiện user kết nối tới TẤT CẢ client
    io.emit("user_connected", userId);

    // Gửi danh sách user đang online CHỈ cho client vừa kết nối
    socket.emit("users_online", Array.from(userSockets.keys()));

    // Gửi danh sách TẤT CẢ hoạt động tới TẤT CẢ client (để user mới cũng nhận được)
    io.emit("activities", Array.from(userActivities.entries()));

    socket.on("update_activity", ({ userId, activity }) => {
      console.log("update_activity", userId, activity);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // Gửi cho người nhận
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        // Gửi xác nhận cho người gửi
        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Error message: ", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnect", () => {
      // Lấy userId trực tiếp từ socket, không cần lặp
      const disconnectedUserId = socket.userId;

      if (disconnectedUserId) {
        // Xóa user khỏi các map
        userSockets.delete(disconnectedUserId);
        userActivities.delete(disconnectedUserId);

        // Thông báo cho các client khác biết user này đã offline
        console.log(`User ${disconnectedUserId} disconnected.`);
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
