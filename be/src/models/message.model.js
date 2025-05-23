import mongoose from "mongoose";

const messageScheme = new mongoose.Schema(
  {
    senderId: {
      type: String, // Clerk user ID
      required: true,
    },
    receiverId: {
      type: String, // Clerk user ID
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageScheme);
