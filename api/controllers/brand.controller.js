import Brand from "../models/brand.model.js";
import Product from "../models/product.model.js";

// Get all brands
export const  getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().populate('subcategoryId').sort({ subcategoryId: 1 });
        res.json({ success: true, message: "Brands retrieved successfully.", data: brands });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get a brand by ID
export const  getBrandById = async (req, res) => {
    try {
        const brandID = req.params.id;
        const brand = await Brand.findById(brandID).populate('subcategoryId');
        if (!brand) {
            return res.status(404).json({ success: false, message: "Brand not found." });
        }
        res.json({ success: true, message: "Brand retrieved successfully.", data: brand });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new brand
export const  createBrand = async (req, res) => {
    const { name, subcategoryId } = req.body;
    if (!name || !subcategoryId) {
        return res.status(400).json({ success: false, message: "Name and subcategory ID are required." });
    }

    try {
        const brand = new Brand({ name, subcategoryId });
        await brand.save();
        res.json({ success: true, message: "Brand created successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a brand
export const  updateBrand = async (req, res) => {
    const brandID = req.params.id;
    const { name, subcategoryId } = req.body;
    if (!name || !subcategoryId) {
        return res.status(400).json({ success: false, message: "Name and subcategory ID are required." });
    }

    try {
        const updatedBrand = await Brand.findByIdAndUpdate(brandID, { name, subcategoryId }, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({ success: false, message: "Brand not found." });
        }
        res.json({ success: true, message: "Brand updated successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a brand
export const  deleteBrand = async (req, res) => {
    const brandID = req.params.id;
    try {
        const products = await Product.find({ proBrandId: brandID });
        if (products.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete brand. Products are referencing it." });
        }

        const brand = await Brand.findByIdAndDelete(brandID);
        if (!brand) {
            return res.status(404).json({ success: false, message: "Brand not found." });
        }
        res.json({ success: true, message: "Brand deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


