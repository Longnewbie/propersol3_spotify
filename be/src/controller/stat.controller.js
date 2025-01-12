import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
          // fetch totalArtists using mongodb aggregation pipeline
          {
            $unionWith: {
              coll: "albums", // collection name
              pipeline: [],
            },
          },
          {
            $group: {
              // group by artist field
              _id: "$artist",
            },
          },
          {
            $count: "count", // count the number of unique artists
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
