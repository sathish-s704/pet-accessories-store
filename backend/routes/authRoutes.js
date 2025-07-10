import express from "express";
import { register, login,logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // { name, email, password, role }
router.post("/login", login);       // { email, password }
router.get("/logout", logout);
export default router;
