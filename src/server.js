import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import foodRouter from "./routers/food.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());
app.use(helmet());

const cors = require('cors');
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:1234',
    'https://burp-six.vercel.app'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use("/api/foods", foodRouter);

app.use("/api/auth", authRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`);
});
