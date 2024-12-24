import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import Product from "../models/product.model.js";
import { uploadCategory } from "../uploadFile.js";
import multer from "multer";

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, message: "Categories retrieved successfully.", data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        res.json({ success: true, message: "Category retrieved successfully.", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new category with image upload
export const createCategory = async (req, res) => {
    uploadCategory.single("img")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                err.message = "File size is too large. Maximum filesize is 5MB.";
            }
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        const { name } = req.body;
        let imageUrl = "no_url";
        if (req.file) {
            imageUrl = `http://localhost:3000/image/category/${req.file.filename}`;
        }

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required." });
        }

        try {
            const newCategory = new Category({
                name,
                image: imageUrl,
            });
            await newCategory.save();
            res.json({ success: true, message: "Category created successfully.", data: null });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Update a category
export const updateCategory = async (req, res) => {
    const categoryID = req.params.id;
    uploadCategory.single("img")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                err.message = "File size is too large. Maximum filesize is 5MB.";
            }
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        const { name } = req.body;
        let image = req.body.image;

        if (req.file) {
            image = `http://localhost:3000/image/category/${req.file.filename}`;
        }

        if (!name || !image) {
            return res.status(400).json({ success: false, message: "Name and image are required." });
        }

        try {
            const updatedCategory = await Category.findByIdAndUpdate(categoryID, { name, image }, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ success: false, message: "Category not found." });
            }
            res.json({ success: true, message: "Category updated successfully.", data: null });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const categoryID = req.params.id;

        const subcategories = await SubCategory.find({ categoryId: categoryID });
        if (subcategories.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete category. Subcategories are referencing it." });
        }

        const products = await Product.find({ proCategoryId: categoryID });
        if (products.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete category. Products are referencing it." });
        }

        const category = await Category.findByIdAndDelete(categoryID);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }
        res.json({ success: true, message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
