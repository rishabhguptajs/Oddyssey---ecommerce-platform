import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "Products fetched successfully.",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while getting products.",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while getting product.",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findById({ slug: req.params.pid })
      .select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while getting photo.",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while deleting product.",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, price, category, description, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (!name || !price || !category || !description || !quantity || !photo) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while updating product.",
    });
  }
};
