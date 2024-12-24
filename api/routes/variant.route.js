import express from 'express';
import asyncHandler from 'express-async-handler';
import { createVariant, deleteVariant, getVariantById, getVariants, updateVariant } from '../controllers/variant.controller.js';

const router = express.Router();

// Get all variants
router.get('/', asyncHandler(getVariants));

// Get a variant by ID
router.get('/:id', asyncHandler(getVariantById));

// Create a new variant
router.post('/', asyncHandler(createVariant));

// Update a variant
router.put('/:id', asyncHandler(updateVariant));

// Delete a variant
router.delete('/:id', asyncHandler(deleteVariant));

export default router;
