
import Product from '../models/product.model.js';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import { uploadProduct } from '../uploadFile.js';

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
        .populate('proCategoryId', 'id name')
        .populate('proSubCategoryId', 'id name')
        .populate('proBrandId', 'id name')
        .populate('proVariantTypeId', 'id type')
        .populate('proVariantId', 'id name');
    res.json({ success: true, message: "Products retrieved successfully.", data: products });
});

// Get a product by ID
export const getProductById = asyncHandler(async (req, res) => {
    const productID = req.params.id;
    const product = await Product.findById(productID)
        .populate('proCategoryId', 'id name')
        .populate('proSubCategoryId', 'id name')
        .populate('proBrandId', 'id name')
        .populate('proVariantTypeId', 'id name')
        .populate('proVariantId', 'id name');
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, message: "Product retrieved successfully.", data: product });
});

// Create new product
export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, quantity, price, offerPrice, proCategoryId, proSubCategoryId, proBrandId, proVariantTypeId, proVariantId, images } = req.body;
    console.log('Request Body:', req.body);

    if (!name || !quantity || !price) {
        return res.status(400).json({ success: false, message: "Required fields are missing." });
    }

    // Process images for testing purposes (allow JSON input)
    const imageUrls = images || [];

    try {
        const newProduct = new Product({
            name,
            description,
            quantity,
            price,
            offerPrice,
            proCategoryId,
            proSubCategoryId,
            proBrandId,
            proVariantTypeId,
            proVariantId,
            images: imageUrls,
        });

        await newProduct.save();
        res.json({ success: true, message: "Product created successfully.", data: newProduct });
    } catch (error) {
        console.error(`Error creating product: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
});


// Update product
export const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    uploadProduct.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
        { name: 'image5', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            console.error(`Update product: ${err}`);
            return res.status(500).json({ success: false, message: err.message });
        }

        const { name, description, quantity, price, offerPrice, proCategoryId, proSubCategoryId, proBrandId, proVariantTypeId, proVariantId } = req.body;
        const productToUpdate = await Product.findById(productId);

        if (!productToUpdate) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        productToUpdate.name = name || productToUpdate.name;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.quantity = quantity || productToUpdate.quantity;
        productToUpdate.price = price || productToUpdate.price;
        productToUpdate.offerPrice = offerPrice || productToUpdate.offerPrice;
        productToUpdate.proCategoryId = proCategoryId || productToUpdate.proCategoryId;
        productToUpdate.proSubCategoryId = proSubCategoryId || productToUpdate.proSubCategoryId;
        productToUpdate.proBrandId = proBrandId || productToUpdate.proBrandId;
        productToUpdate.proVariantTypeId = proVariantTypeId || productToUpdate.proVariantTypeId;
        productToUpdate.proVariantId = proVariantId || productToUpdate.proVariantId;

        const fields = ['image1', 'image2', 'image3', 'image4', 'image5'];
        fields.forEach((field, index) => {
            if (req.files[field] && req.files[field].length > 0) {
                const file = req.files[field][0];
                const imageUrl = `http://localhost:3000/image/products/${file.filename}`;
                let imageEntry = productToUpdate.images.find(img => img.image === (index + 1));
                if (imageEntry) {
                    imageEntry.url = imageUrl;
                } else {
                    productToUpdate.images.push({ image: index + 1, url: imageUrl });
                }
            }
        });

        await productToUpdate.save();
        res.json({ success: true, message: "Product updated successfully." });
    });
});

// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.json({ success: true, message: "Product deleted successfully." });
});

