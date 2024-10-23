import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:1234", "https://burp-six.vercel.app/"], // Add your frontend origins
}));

// Serve static files from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// API routes
app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Backend is listening on port ' + PORT);
});
