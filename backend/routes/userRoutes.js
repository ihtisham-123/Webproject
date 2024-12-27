// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const validateVerificationData = require('../middlewares/validation');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



// Public routes
router.post('/signup', userController.signup);
router.post('/verify-otp', userController.verifyOTP);
// router.post('/verify-code', userController.verifyOTP);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.patch('/reset-password/:token', userController.resetPassword);

// Protected routes
// router.use(authMiddleware.protect);

module.exports = router;