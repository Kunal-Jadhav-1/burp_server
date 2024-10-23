import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration for localhost and Vercel
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://your-vercel-app.vercel.app"]
}));

// Static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// API routes
app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
