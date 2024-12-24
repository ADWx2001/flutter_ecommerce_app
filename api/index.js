// node js startup
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

//all api routes
import brandRoute from './routes/brand.route.js';
import categoryRoute from './routes/category.route.js';
import couponCodeRoute from './routes/coupon.route.js';
import notificationRoute from './routes/notification.route.js';
import orderRoute from './routes/order.route.js';
import paymentRoute from './routes/payment.route.js';
import posterRoute from './routes/poster.route.js';
import productRoute from './routes/product.route.js';
import subCategoryRoute from './routes/subCategory.route.js';
import userRoute from './routes/user.route.js';
import variantRoute from './routes/variant.route.js';
import variantTypeRoute from './routes/variant_type.route.js';

//initializing express
const app = express();
app.use(cors({ origin: '*' }))
app.use(bodyParser.json());

//connecting to mongodb
const URL = process.env.MONGO;
mongoose.connect(URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//static folder paths


//route usage
app.use('/brands', brandRoute);
app.use('/categories', categoryRoute);
app.use('/couponCodes', couponCodeRoute);
app.use('/notifications', notificationRoute);
app.use('/orders', orderRoute);
app.use('/payments', paymentRoute);
app.use('/posters', posterRoute);
app.use('/products', productRoute);
app.use('/subCategories', subCategoryRoute);
app.use('/users', userRoute);
app.use('/variants', variantRoute);
app.use('/variantTypes', variantTypeRoute);


//default route
app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});