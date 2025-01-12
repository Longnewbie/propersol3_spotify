import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId; // from auth middleware
    const users = await User.find({ clerkId: { $ne: currentUserId } }); // exclude current user
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
