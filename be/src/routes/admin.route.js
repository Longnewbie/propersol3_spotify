import { Router } from "express";
import {
  addSongToAlbum,
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
  getAllAlbumsForAdmin,
  removeSongFromAlbum,
  updateSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);
router.get("/albums", getAllAlbumsForAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.put("/songs/:id", updateSong);
router.delete("/albums/:id", deleteAlbum);
router.post("/albums/add-song", addSongToAlbum);
router.post("/albums/remove-song", removeSongFromAlbum);

export default router;
