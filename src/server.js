import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";

const app = express();

// CORS Configuration
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:1234", "https://burp-six.vercel.app"], // Add your frontend origins
}));

// app.use('/images', express.static(path.join(__dirname, 'images')));
// API routes (make sure foodRouter returns S3 URLs)
app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Backend is listening on port ' + PORT);
});
