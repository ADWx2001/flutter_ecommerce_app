import Order from '../models/order.model.js';

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('couponCode', 'id couponCode discountType discountAmount')
            .populate('userID', 'id name')
            .sort({ _id: -1 });

        res.json({ success: true, message: "Orders retrieved successfully.", data: orders });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const orders = await Order.find({ userID: userId })
            .populate('couponCode', 'id couponCode discountType discountAmount')
            .populate('userID', 'id name')
            .sort({ _id: -1 });

        res.json({ success: true, message: "Orders retrieved successfully.", data: orders });
    } catch (error) {
        console.error('Error retrieving orders by user ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    const orderID = req.params.id;

    try {
        const order = await Order.findById(orderID)
            .populate('couponCode', 'id couponCode discountType discountAmount')
            .populate('userID', 'id name');

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Order retrieved successfully.", data: order });
    } catch (error) {
        console.error('Error retrieving order by ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    const { userID, orderStatus, items, totalPrice, shippingAddress, paymentMethod, couponCode, orderTotal, trackingUrl } = req.body;

    if (!userID || !items || !totalPrice || !shippingAddress || !paymentMethod || !orderTotal) {
        return res.status(400).json({ success: false, message: "Required fields are missing." });
    }

    try {
        const order = new Order({ userID, orderStatus, items, totalPrice, shippingAddress, paymentMethod, couponCode, orderTotal, trackingUrl });
        await order.save();

        res.json({ success: true, message: "Order created successfully.", data: null });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const orderID = req.params.id;
    const { orderStatus, trackingUrl } = req.body;

    if (!orderStatus) {
        return res.status(400).json({ success: false, message: "Order status is required." });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderID,
            { orderStatus, trackingUrl },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Order updated successfully.", data: null });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const orderID = req.params.id;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderID);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Order deleted successfully.", data: null });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
