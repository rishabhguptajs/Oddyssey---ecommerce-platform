import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController } from "./../controllers/categoryController.js";

const router = express.Router();

// routes here
// create category routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category routes
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

export default router;