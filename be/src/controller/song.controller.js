import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); // sort by createdAt -1 desc || 1 asc
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const searchSongs = async (req, res, next) => {
  try {
    const q = (req.query.q || "").toString().trim();
    if (!q) return res.status(200).json([]);

    // simple case-insensitive partial match on title or artist
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const songs = await Song.find({
      $or: [{ title: regex }, { artist: regex }],
    })
      .limit(20)
      .populate("albumId", "_id title imageUrl");

    // map albumId to a consistent album object if populated
    const mapped = songs.map((s) => ({
      _id: s._id,
      title: s.title,
      artist: s.artist,
      imageUrl: s.imageUrl,
      audioUrl: s.audioUrl,
      // include lyrics if present in DB
      lyrics: s.lyrics || "",
      album: s.albumId
        ? {
            _id: s.albumId._id,
            title: s.albumId.title,
            imageUrl: s.albumId.imageUrl,
          }
        : null,
    }));

    res.status(200).json(mapped);
  } catch (error) {
    next(error);
  }
};

// new: return the lyrics text (LRC or plain) for a single song
export const getLyrics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id).select("lyrics");
    if (!song) return res.status(404).json({ message: "Song not found" });

    // disable client caching for lyrics to avoid stale 304 responses
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    res.status(200).json({ lyrics: song.lyrics || "" });
  } catch (error) {
    next(error);
  }
};
