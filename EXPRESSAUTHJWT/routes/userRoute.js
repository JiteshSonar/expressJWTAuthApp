import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

//Public Routes
router.post('/register', UserController.UserRegistration)
router.post('/login', UserController.userLgin)



// Protected Routes


export default router;