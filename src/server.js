import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import authRouter from './authRouter.js';
import "./models/dbConnection.js";


const app = express();

// CORS Configuration
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:1234", "https://burp-six.vercel.app"], 
}));

app.use("/auth", authRouter)

// API routes (make sure foodRouter returns S3 URLs)
app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Backend is listening on port ' + PORT);
});
