import express from "express";
import { registerController, loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ALL ROUTING DONE HERE!!

// register -> using post method
router.post('/register', registerController);   

// login -> using post method
router.post('/login', loginController);

// test routes here
router.get('/test', requireSignIn, isAdmin, testController);

export default router;  