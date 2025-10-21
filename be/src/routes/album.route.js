import { Router } from "express";
import { getAlbumById, getAllAlbums, getHottestAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/hottest", getHottestAlbums);
router.get("/:id", getAlbumById);

export default router;
