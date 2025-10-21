import mongoose from "mongoose";

const songScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    lyrics: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

export const Song = mongoose.model("Song", songScheme);
