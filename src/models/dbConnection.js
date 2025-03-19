import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import mongoose from "mongoose";


if (!process.env.DB_URL) {
    console.error("Error: DB_URL is undefined! Check your .env file.");
    process.exit(1); // Exit process to avoid further errors
}

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
