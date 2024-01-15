import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } from "./../controllers/categoryController.js";

const router = express.Router();

// routes here
// create category routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category routes
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// getAll category
router.get('/get-category', categoryController)

// single category
router.get('/single-category/:slug', singleCategoryController)

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;