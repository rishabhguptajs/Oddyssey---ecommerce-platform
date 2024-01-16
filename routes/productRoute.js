import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductsController } from "../controllers/productController.js";
import formidale from "express-formidable";

const router = express.Router();

// routes here

router.post('/create-product', requireSignIn, isAdmin, formidale(), createProductController);

router.get('/get-product', (req, res) => getProductsController);

export default router;