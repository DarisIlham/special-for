import { Router } from "express";
const router = Router();
import {
  getWishes,
  createWish,
  updateWish,
  deleteWish,
} from "../controllers/wish.controller.js";
import validateWish from "../middleware/validate.wish.js";

// Get all wishes
router.get("/", getWishes);

// Create a new wish
router.post("/", validateWish, createWish);

// Update a wish
router.put("/:id", validateWish, updateWish);

// Delete a wish
router.delete("/:id", deleteWish);

export default router;