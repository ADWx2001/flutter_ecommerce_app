import Variant from '../models/variant.model.js';
import Product from '../models/product.model.js';

// Get all variants
export const getVariants = async (req, res) => {
    try {
        const variants = await Variant.find().populate('variantTypeId').sort({ 'variantTypeId': 1 });
        res.json({ success: true, message: "Variants retrieved successfully.", data: variants });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a variant by ID
export const getVariantById = async (req, res) => {
    try {
        const variantID = req.params.id;
        const variant = await Variant.findById(variantID).populate('variantTypeId');
        if (!variant) {
            return res.status(404).json({ success: false, message: "Variant not found." });
        }
        res.json({ success: true, message: "Variant retrieved successfully.", data: variant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new variant
export const createVariant = async (req, res) => {
    const { name, variantTypeId } = req.body;
    if (!name || !variantTypeId) {
        return res.status(400).json({ success: false, message: "Name and VariantType ID are required." });
    }

    try {
        const variant = new Variant({ name, variantTypeId });
        await variant.save();
        res.json({ success: true, message: "Variant created successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a variant
export const updateVariant = async (req, res) => {
    const { name, variantTypeId } = req.body;
    const variantID = req.params.id;

    if (!name || !variantTypeId) {
        return res.status(400).json({ success: false, message: "Name and VariantType ID are required." });
    }

    try {
        const updatedVariant = await Variant.findByIdAndUpdate(variantID, { name, variantTypeId }, { new: true });
        if (!updatedVariant) {
            return res.status(404).json({ success: false, message: "Variant not found." });
        }
        res.json({ success: true, message: "Variant updated successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a variant
export const deleteVariant = async (req, res) => {
    const variantID = req.params.id;
    try {
        // Check if any products reference this variant
        const products = await Product.find({ proVariantId: variantID });
        if (products.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete variant. Products are referencing it." });
        }

        const variant = await Variant.findByIdAndDelete(variantID);
        if (!variant) {
            return res.status(404).json({ success: false, message: "Variant not found." });
        }
        res.json({ success: true, message: "Variant deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

