import express from 'express';
import asyncHandler from 'express-async-handler';
import { createVariantType, deleteVariantType, getVariantTypeById, getVariantTypes, updateVariantType } from '../controllers/variat_type.controller.js';

const router = express.Router();

// Get all variant types
router.get('/', asyncHandler(getVariantTypes));

// Get a variant type by ID
router.get('/:id', asyncHandler(getVariantTypeById));

// Create a new variant type
router.post('/', asyncHandler(createVariantType));

// Update a variant type
router.put('/:id', asyncHandler(updateVariantType));

// Delete a variant type
router.delete('/:id', asyncHandler(deleteVariantType));

export default router;
