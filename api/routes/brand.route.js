import express from 'express';
import { getAllBrands, createBrand, getBrandById, updateBrand, deleteBrand } from '../controllers/brand.controller.js';

const router = express.Router();

// Get all brands
router.get('/', getAllBrands);

// Get a brand by ID
router.get('/:id', getBrandById);

// Create a new brand
router.post('/', createBrand);

// Update a brand
router.put('/:id', updateBrand);

// Delete a brand
router.delete('/:id', deleteBrand);

export default router;
