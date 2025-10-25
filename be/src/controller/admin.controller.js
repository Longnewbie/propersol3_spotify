import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper func for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary ", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files!" });
    }
    const { title, artist, duration } = req.body; // Bỏ albumId
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const [audioResult, imageResult] = await Promise.all([
      uploadToCloudinary(audioFile),
      uploadToCloudinary(imageFile),
    ]);

    const song = new Song({
      title,
      artist,
      audioUrl: audioResult,
      imageUrl: imageResult,
      duration,
    });

    await song.save();
    return res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong ", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Cập nhật TẤT CẢ album chứa bài hát này
    if (song.albums && song.albums.length > 0) {
      await Album.updateMany(
        { _id: { $in: song.albums } }, // Tìm tất cả album trong mảng
        { $pull: { songs: song._id } } // Gỡ song._id ra
      );
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong ", error);
    next(error);
  }
};

export const getAllAlbumsForAdmin = async (req, res, next) => {
  try {
    // 1. Get page, limit, and query from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.q || "";

    // 2. Calculate skip value
    const skip = (page - 1) * limit;

    // 3. Build filter for search (title or artist)
    let filter = {};
    if (query) {
      const regex = new RegExp(
        query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
      filter = { $or: [{ title: regex }, { artist: regex }] };
    }

    // 4. Fetch paginated albums and total count concurrently
    const albumsPromise = Album.find(filter)
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip)
      .limit(limit);
    // We usually don't need song details for the album list view
    // .populate('songs'); // Remove or comment out populate if not needed here

    const countPromise = Album.countDocuments(filter);

    const [albums, totalAlbums] = await Promise.all([
      albumsPromise,
      countPromise,
    ]);

    // 5. Calculate total pages
    const totalPages = Math.ceil(totalAlbums / limit);

    // 6. Send paginated response
    res.status(200).json({
      albums,
      currentPage: page,
      totalPages,
      totalAlbums,
    });
  } catch (error) {
    console.error("Error in getAllAlbums:", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    return res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum ", error);
    next(error);
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, artist, duration, lyrics } = req.body;

    if (!title || !artist) {
      return res.status(400).json({
        message: "Title and artist are required",
      });
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        artist: artist.trim(),
        duration: duration || 0,
        lyrics: lyrics || "",
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSong) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // Gỡ ID album này ra khỏi tất cả bài hát
    if (album.songs && album.songs.length > 0) {
      await Song.updateMany(
        { _id: { $in: album.songs } },
        { $pull: { albums: album._id } }
      );
    }

    // Xoá album
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum ", error);
    next(error);
  }
};

export const addSongToAlbum = async (req, res, next) => {
  try {
    const { albumId, songId } = req.body;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (song.albums.includes(albumId)) {
      return res.status(400).json({ message: "Song already in this album" });
    }

    await Song.findByIdAndUpdate(songId, { $push: { albums: albumId } });
    await Album.findByIdAndUpdate(albumId, { $push: { songs: songId } });

    res.status(200).json({ message: "Song added to album successfully" });
  } catch (error) {
    console.log("Error in addSongToAlbum ", error);
    next(error);
  }
};

export const removeSongFromAlbum = async (req, res, next) => {
  try {
    const { albumId, songId } = req.body;

    await Song.findByIdAndUpdate(songId, { $pull: { albums: albumId } });
    await Album.findByIdAndUpdate(albumId, { $pull: { songs: songId } });

    res.status(200).json({ message: "Song removed from album successfully" });
  } catch (error) {
    console.log("Error in removeSongFromAlbum ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
