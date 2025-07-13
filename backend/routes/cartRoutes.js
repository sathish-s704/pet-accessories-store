import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);

// Add item to cart
router.post("/add", addToCart);

// Get cart
router.get("/", getCart);

// 🗑️ Clear entire cart
router.delete("/clear", clearCart);

export default router;
