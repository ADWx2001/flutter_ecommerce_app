// const Notification = require('../model/notification');
// const OneSignal = require('onesignal-node');
import Notification from '../models/notification.model.js';
import * as OneSignal from 'onesignal-node';

// Initialize OneSignal client
const client = new OneSignal.Client(process.env.ONE_SIGNAL_APP_ID, process.env.ONE_SIGNAL_REST_API_KEY);

// Send notification to all users
export const sendNotification = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    const notificationBody = {
        contents: {
            'en': description
        },
        headings: {
            'en': title
        },
        included_segments: ['All'],
        ...(imageUrl && { big_picture: imageUrl })
    };

    try {
        const response = await client.createNotification(notificationBody);
        const notificationId = response.body.id;
        console.log('Notification sent to all users:', notificationId);

        const notification = new Notification({ notificationId, title, description, imageUrl });
        await notification.save();

        res.json({ success: true, message: 'Notification sent successfully', data: null });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Track notification delivery status
export const trackNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {
        const response = await client.viewNotification(notificationId);
        const androidStats = response.body.platform_delivery_stats;

        const result = {
            platform: 'Android',
            success_delivery: androidStats.android.successful,
            failed_delivery: androidStats.android.failed,
            errored_delivery: androidStats.android.errored,
            opened_notification: androidStats.android.converted
        };

        console.log('Notification details:', androidStats);
        res.json({ success: true, message: 'Success', data: result });
    } catch (error) {
        console.error('Error tracking notification:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all notifications
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ _id: -1 });
        res.json({ success: true, message: "Notifications retrieved successfully.", data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete notification by ID
export const deleteNotification = async (req, res) => {
    const notificationID = req.params.id;

    try {
        const notification = await Notification.findByIdAndDelete(notificationID);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }

        res.json({ success: true, message: "Notification deleted successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
