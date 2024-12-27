const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware
const router = express.Router();

router.post('/create',authMiddleware.protect ,orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id', authMiddleware.protect, orderController.updateOrderById);
router.delete('/:id', authMiddleware.protect, orderController.deleteOrderById);

module.exports = router;