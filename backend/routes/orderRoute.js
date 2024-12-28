const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const lowercaseMiddleware = require('../middlewares/lowercaseMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.protect, lowercaseMiddleware, orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', authMiddleware.protect, orderController.getOrdersByUserId); // New route for getting orders by user ID
router.patch('/:id',  orderController.updateOrderById);
router.delete('/:id', authMiddleware.protect, orderController.deleteOrderById);

module.exports = router;

