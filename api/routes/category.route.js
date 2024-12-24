import express from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

// Get a category by ID
router.get("/:id", getCategoryById);

// Create a new category
router.post("/", createCategory);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

export default router;
