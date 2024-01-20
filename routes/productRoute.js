import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidale from "express-formidable";

const router = express.Router();

// routes here

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidale(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidale(),
  updateProductController
);

router.get("/get-product", getProductsController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/product/:pid", deleteProductController);

export default router;
