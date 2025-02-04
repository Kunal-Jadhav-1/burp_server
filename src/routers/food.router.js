import express from "express";
import { body } from "express-validator";
import { getAllFoods, getFoodById, addFood } from "../controllers/food.controller.js";

const router = express.Router();

// Get all food items
router.get("/", getAllFoods);

// Get a specific food item by ID
router.get("/:id", getFoodById);

// Add a new food item with validation
router.post(
    "/",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("category").notEmpty().withMessage("Category is required")
    ],
    addFood
);

export default router;
