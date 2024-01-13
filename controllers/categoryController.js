import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(401).send({
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if(existingCategory) {
            return res.status(401).send({
                success : true,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
            message: "Error in Category"
        })
    }
};

export const updateCategoryController = async(req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while updating category",
            error,
        });
    }
};