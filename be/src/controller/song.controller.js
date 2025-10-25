import { Song } from "../models/song.model.js";

// export const getAllSongs = async (req, res, next) => {
//   try {
//     const songs = await Song.find().sort({ createdAt: -1 }); // sort by createdAt -1 desc || 1 asc
//     res.status(200).json(songs);
//   } catch (error) {
//     next(error);
//   }
// };

export const getAllSongs = async (req, res, next) => {
  try {
    const pageParam = req.query.page;
    const limitParam = req.query.limit;
    const query = req.query.q || "";

    const shouldPaginate = pageParam && limitParam;
    let page = 1;
    let limit = 0; // Mặc định limit = 0 (lấy tất cả) nếu không phân trang

    if (shouldPaginate) {
      page = parseInt(pageParam) || 1;
      limit = parseInt(limitParam) || 10; // Default limit khi phân trang
      if (page < 1) page = 1;
      if (limit < 1) limit = 10;
    }

    const skip = (page - 1) * limit;

    let filter = {};
    if (query) {
      const regex = new RegExp(
        query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
      filter = { $or: [{ title: regex }, { artist: regex }] };
    }

    // Tạo query cơ bản
    let songsQuery = Song.find(filter).sort({ createdAt: -1 });

    // Áp dụng skip và limit NẾU cần phân trang
    if (shouldPaginate) {
      songsQuery = songsQuery.skip(skip).limit(limit);
    }

    // Fetch songs (có thể có hoặc không có limit)
    const songsPromise = songsQuery;

    // Chỉ đếm nếu phân trang
    const countPromise = shouldPaginate
      ? Song.countDocuments(filter)
      : Promise.resolve(0); // Resolve 0 nếu không đếm

    const [songs, totalSongs] = await Promise.all([songsPromise, countPromise]);

    // Trả về response dựa trên việc có phân trang hay không
    if (shouldPaginate) {
      const totalPages = Math.ceil(totalSongs / limit);
      res.status(200).json({
        songs,
        currentPage: page,
        totalPages,
        totalSongs,
      });
    } else {
      // Trả về toàn bộ danh sách nếu không phân trang
      res.status(200).json(songs); // Chỉ trả về mảng songs
    }
  } catch (error) {
    console.error("Error in getAllSongs:", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 9 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albums: 1,
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
        $sample: { size: 12 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albums: 1,
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
        $sample: { size: 12 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albums: 1,
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
      .populate("albums", "_id title imageUrl");

    // map albumId to a consistent album object if populated
    const mapped = songs.map((s) => ({
      _id: s._id,
      title: s.title,
      artist: s.artist,
      imageUrl: s.imageUrl,
      audioUrl: s.audioUrl,
      // include lyrics if present in DB
      lyrics: s.lyrics || "",
      album:
        s.albums && s.albums.length > 0
          ? {
              _id: s.albums[0]._id,
              title: s.albums[0].title,
              imageUrl: s.albums[0].imageUrl,
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
