const express = require('express');
const router = express.Router();
const { adminLogin, searchOrders,getOrdersByUserId } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware2');

router.post('/login', adminLogin);
router.get('/search', protect, adminOnly, searchOrders);
// router.patch('/:id',  orderController.updateOrderById);
router.get('/orders/user/:userId', protect, adminOnly, getOrdersByUserId);

module.exports = router;