import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId; // from auth middleware
    const users = await User.find({ clerkId: { $ne: currentUserId } }); // exclude current user
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId; // from auth middleware
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // sort by createdAt -1 desc || 1 asc

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
