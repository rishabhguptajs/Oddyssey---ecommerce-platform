import productModel from "../models/productModel.js"
import fs from "fs"
import slugify from "slugify"

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { photo } = req.files
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" })
      case !description:
        return res.status(500).send({ error: "Description is Required" })
      case !price:
        return res.status(500).send({ error: "Price is Required" })
      case !category:
        return res.status(500).send({ error: "Category is Required" })
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" })
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" })
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type
    }
    await products.save()
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    })
  }
}

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "Products fetched successfully.",
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error while getting products.",
      error: error.message,
    })
  }
}

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while getting product.",
    })
  }
}

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType)
      return res.send(product.photo.data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while getting photo.",
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while deleting product.",
    })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { photo } = req.files
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" })
      case !description:
        return res.status(500).send({ error: "Description is Required" })
      case !price:
        return res.status(500).send({ error: "Price is Required" })
      case !category:
        return res.status(500).send({ error: "Category is Required" })
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" })
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" })
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    )
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type
    }
    await products.save()
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    })
  }
}

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
    const products = await productModel.find(args)
    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while filtering products.",
    })
  }
}

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).json({
      success: true,
      total,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while getting total products.",
    })
  }
}

export const productListController = async (req, res) => {
  try {
    const page = req.params.page || 1
    const perPage = 5
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while getting products.",
    })
  }
}

export const searchProductController = async (req, res) => {
  try {
    const search = req.params.keyword;
    const results = await productModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: 'i' } },
      ],
    }).select('-photo')

    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: "Error while searching products.",
      error,
    })
  }
}
