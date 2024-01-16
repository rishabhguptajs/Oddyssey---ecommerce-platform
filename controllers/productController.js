import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async( req, res ) => {
    try {
        const { name, slug, price, category, description, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if( !name  || !price || !category || !description || !quantity || !photo ) {
            return res.status(400).json({
                success: false,
                error: "All fields are required."
            })
        }
        const product = new productModel({...req.fields, slug: slugify(name)});
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error."
        })
    }
}

export const getProductsController = async(req, res) => {
    try {
        const products = await productModel.find({}).select('-photo').limit(10).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            countTotal: products.length,
            message: "Products fetched successfully.",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while getting products."
        })
    }
}