import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductsController, getSingleProductController, productPhotoController } from "../controllers/productController.js";
import formidale from "express-formidable";

const router = express.Router();

// routes here

router.post('/create-product', requireSignIn, isAdmin, formidale(), createProductController);

router.get('/get-product', getProductsController);

router.get('/get-product/:slug', getSingleProductController);

router.get('/product-photo/:pid', productPhotoController);

export default router;