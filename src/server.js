import express from "express";
import { food } from "../data.js"; // Make sure this imports your food data correctly

const router = express.Router();

router.get("/", (req, res) => {
    res.json(food); // Ensure you're sending JSON response
});

export default router;