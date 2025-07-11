import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", protect, createOrder);             // Create order
router.get("/my", protect, getMyOrders);            // View own orders

// Admin Routes
router.get("/", protect, admin, getAllOrders);                      // View all orders
router.put("/:id", protect, admin, updateOrderStatus);             // Update status
router.delete("/:id", protect, admin, deleteOrder);                // Delete order

export default router;
