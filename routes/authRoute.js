import express from "express";
import { registerController, loginController } from "../controllers/authController.js";

const router = express.Router();

// routing here

// register -> using post method
router.post('/register', registerController);   

// login -> using post method
router.post('/login', loginController);

export default router;