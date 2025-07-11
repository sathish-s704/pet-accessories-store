// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Check if token exists
// export const protect = async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token failed", error: err.message });
//   }
// };

// // Only Admin
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admins only" });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔒 Middleware to protect routes (supports both cookie and header tokens)
export const protect = async (req, res, next) => {
  let token = null;

  // 1. Try reading token from cookie
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2. If not in cookie, try Authorization header
  else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3. If no token, reject access
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired", error: err.message });
  }
};

// 🛡️ Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admins only" });
  }
};
