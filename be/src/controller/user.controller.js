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

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId }).select(
      "favorites"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteSongs = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId }).populate(
      "favorites"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // user.favorites bây giờ sẽ là một mảng [Song, Song, ...]
    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const { songId } = req.body;
    const clerkId = req.auth.userId;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Kiểm tra xem bài hát đã có trong danh sách yêu thích chưa
    const isFavorite = user.favorites.includes(songId);

    if (isFavorite) {
      user.favorites = user.favorites.filter((id) => id.toString() !== songId);
    } else {
      user.favorites.push(songId);
    }

    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};
