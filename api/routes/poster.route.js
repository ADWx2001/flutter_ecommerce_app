import express from 'express';
import {
    getAllPosters,
    getPosterById,
    createPoster,
    updatePoster,
    deletePoster
} from '../controllers/poster.controller.js';

const router = express.Router();

// Route to get all posters
router.get('/', getAllPosters);

// Route to get a poster by ID
router.get('/:id', getPosterById);

// Route to create a new poster
router.post('/', createPoster);

// Route to update a poster
router.put('/:id', updatePoster);

// Route to delete a poster
router.delete('/:id', deletePoster);

export default router;
