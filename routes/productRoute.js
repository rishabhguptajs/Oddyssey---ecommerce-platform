import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js"
import formidale from "express-formidable"

const router = express.Router()

// routes here

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidale(),
  createProductController
)
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidale(),
  updateProductController
)

router.get("/get-product", getProductsController)

router.get("/get-product/:slug", getSingleProductController)

router.get("/product-photo/:pid", productPhotoController)

router.delete("/delete-product/:pid", deleteProductController)

router.post("/product-filters", productFiltersController)

router.get("/product-count", productCountController)

router.get("/product-list/:page", productListController)

router.get("/search/:keyword", searchProductController)

export default router
