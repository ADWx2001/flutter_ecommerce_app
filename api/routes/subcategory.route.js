import express from 'express';
import asyncHandler from 'express-async-handler';
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from '../controllers/subcategory.controller.js';

const router = express.Router();

// Get all sub-categories
router.get('/', getAllSubCategories);

// Get a sub-category by ID
router.get('/:id', getSubCategoryById);

// Create a new sub-category
router.post('/', createSubCategory);

// Update a sub-category
router.put('/:id', updateSubCategory);

// Delete a sub-category
router.delete('/:id', deleteSubCategory);

export default router;
