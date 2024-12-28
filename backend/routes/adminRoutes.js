const express = require('express');
const router = express.Router();
const { adminLogin, searchOrders } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware2');

router.post('/login', adminLogin);
router.get('/search', protect, adminOnly, searchOrders);
// router.patch('/:id',  orderController.updateOrderById);

module.exports = router;