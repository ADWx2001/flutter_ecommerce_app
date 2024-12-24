import express from 'express';
import asyncHandler from 'express-async-handler';
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from '../controllers/subcategory.controller.js';

const router = express.Router();

// Get all sub-categories
router.get('/', asyncHandler(getAllSubCategories));

// Get a sub-category by ID
router.get('/:id', asyncHandler(getSubCategoryById));

// Create a new sub-category
router.post('/', asyncHandler(createSubCategory));

// Update a sub-category
router.put('/:id', asyncHandler(updateSubCategory));

// Delete a sub-category
router.delete('/:id', asyncHandler(deleteSubCategory));

export default router;
