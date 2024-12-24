import express from 'express';
import asyncHandler from 'express-async-handler';
import { deleteUser, getUserById, getUsers, loginUser, registerUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Get all users
router.get('/', asyncHandler(getUsers));

// Login
router.post('/login', asyncHandler(loginUser));

// Get a user by ID
router.get('/:id', asyncHandler(getUserById));

// Register a new user
router.post('/register', asyncHandler(registerUser));

// Update a user
router.put('/:id', asyncHandler(updateUser));

// Delete a user
router.delete('/:id', asyncHandler(deleteUser));

export default router;
