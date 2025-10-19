import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getFavorites,
  getFavoriteSongs,
  getMessages,
  toggleFavorite,
} from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);
router.get("/favorites", protectRoute, getFavorites);
router.get("/favorites/details", protectRoute, getFavoriteSongs);
router.post("/toggle-favorite", protectRoute, toggleFavorite);

export default router;
