// stripe.controller.js
import dotenv from 'dotenv';
import stripePackage from 'stripe';
import asyncHandler from 'express-async-handler';

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SKRT_KET_TST);

// Handle Stripe payments
export const handleStripePayment = asyncHandler(async (req, res) => {
    const { email, name, address, amount, currency, description } = req.body;

    try {
        console.log('Processing Stripe payment');

        // Create a Stripe customer
        const customer = await stripe.customers.create({
            email,
            name,
            address
        });

        // Create an ephemeral key for the customer
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2023-10-16' }
        );

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            customer: customer.id,
            description,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PBLK_KET_TST,
        });
    } catch (error) {
        console.error('Stripe payment error:', error);
        res.status(500).json({
            error: true,
            message: error.message,
            data: null
        });
    }
});

// Handle Razorpay key retrieval
export const handleRazorpayKey = asyncHandler(async (req, res) => {
    try {
        console.log('Fetching Razorpay key');
        res.json({ key: process.env.RAZORPAY_KEY_TEST });
    } catch (error) {
        console.error('Razorpay key error:', error);
        res.status(500).json({
            error: true,
            message: error.message,
            data: null
        });
    }
});


