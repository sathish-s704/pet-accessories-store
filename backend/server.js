import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
const app = express();
//middleware for parsing json request for body
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;
const db = process.env.MONGO_URI;
app.use(cookieParser());    
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/paypal", paymentRoutes);
app.use('/api/contact', contactRoutes);

app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads")); // to serve images

//connect to database
mongoose.connect(db).then(() => {console.log('Connected to database');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => console.log(err));