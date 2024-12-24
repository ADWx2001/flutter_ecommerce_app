import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, getOrdersByUserId, updateOrder } from '../controllers/order.controller.js';

const router = express.Router();
// Routes setup
router.get('/', getAllOrders);
router.get('/orderByUserId/:userId', getOrdersByUserId);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
