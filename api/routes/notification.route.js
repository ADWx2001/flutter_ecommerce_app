import express from "express";
import {
    sendNotification,
    trackNotification,
    getAllNotifications,
    deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

// Get all notifications
router.get("/", getAllNotifications);

// Send a notification to all users
router.post("/", sendNotification);

// Track a notification delivery status
router.get("/:id", trackNotification);

// Delete a notification by ID
router.delete("/:id", deleteNotification);

export default router;
