import SubCategory from '../models/subcategory.model.js';
import Brand from '../models/brand.model.js';
import Product from '../models/product.model.js';

// Get all sub-categories
export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId').sort({'categoryId': 1});
        res.json({ success: true, message: "Sub-categories retrieved successfully.", data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a sub-category by ID
export const getSubCategoryById = async (req, res) => {
    try {
        const subCategoryID = req.params.id;
        const subCategory = await SubCategory.findById(subCategoryID).populate('categoryId');
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Sub-category not found." });
        }
        res.json({ success: true, message: "Sub-category retrieved successfully.", data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new sub-category
export const createSubCategory = async (req, res) => {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
        return res.status(400).json({ success: false, message: "Name and category ID are required." });
    }

    try {
        const subCategory = new SubCategory({ name, categoryId });
        await subCategory.save();
        res.json({ success: true, message: "Sub-category created successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a sub-category
export const updateSubCategory = async (req, res) => {
    const subCategoryID = req.params.id;
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
        return res.status(400).json({ success: false, message: "Name and category ID are required." });
    }

    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subCategoryID, { name, categoryId }, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).json({ success: false, message: "Sub-category not found." });
        }
        res.json({ success: true, message: "Sub-category updated successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a sub-category
export const deleteSubCategory = async (req, res) => {
    const subCategoryID = req.params.id;
    try {
        const brandCount = await Brand.countDocuments({ subcategoryId: subCategoryID });
        if (brandCount > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete sub-category. It is associated with one or more brands." });
        }

        const products = await Product.find({ proSubCategoryId: subCategoryID });
        if (products.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete sub-category. Products are referencing it." });
        }

        const subCategory = await SubCategory.findByIdAndDelete(subCategoryID);
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Sub-category not found." });
        }
        res.json({ success: true, message: "Sub-category deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

