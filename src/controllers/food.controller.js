import Food from "../models/food.model.js";
import { validationResult } from "express-validator";

// Get all food items
export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        if (!foods.length) {
            return res.status(404).json({ message: "No food items found" });
        }
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch food data" });
    }
};

// Get a single food item by ID
export const getFoodById = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food item" });
    }
};

// Add a new food item with validation
export const addFood = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, price, category, imageUrl } = req.body;
        const newFood = new Food({ name, price, category, imageUrl });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(500).json({ message: "Failed to add food item" });
    }
};
