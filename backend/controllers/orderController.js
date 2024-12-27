// const OrderDetail = require('../models/orderDetail');
const mongoose = require('mongoose');

const OrderDetail = require('../models/orderDetail');


// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { challengeType, accountSize, platform, couponCode, transactionId, paymentProof, total } = req.body;
    const userId = req.user._id; // Assuming you have user information in req.user

    console.log(challengeType, accountSize, platform, transactionId, total);
    if (!challengeType || !accountSize || !platform || !transactionId || !total) {
      return res.status(400).json({
        status: 'error',
        message: 'All required fields must be provided',
      });
    }

    const newOrder = new OrderDetail({
      user: userId,
      challengeType,
      accountSize,
      platform,
      couponCode,
      transactionId,
      paymentProof,
      total,
    });
    
    newOrder.save();

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Other controller functions (getAllOrders, getOrderById, updateOrderById, deleteOrderById) can be added here

// Update an order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const { challengeType, accountSize, platform, couponCode, transactionId, paymentProof, total } = req.body;
    const userId = req.user.id; // Assuming you have user information in req.user

    const updatedOrder = await OrderDetail.findByIdAndUpdate(
      req.params.id,
      {
        user: userId,
        challengeType,
        accountSize,
        platform,
        couponCode,
        transactionId,
        paymentProof,
        total,
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order: updatedOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderDetail.find().populate('user');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// const OrderDetail = require('../models/orderDetail');

// const OrderDetail = require('../models/orderDetail');

// Get all orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);
  try {
    const orders = await OrderDetail.find({ 'user': userId }).populate('user');

    console.log(orders);
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No orders found for this user',
      });
    }

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderDetail.findById(req.params.id).populate('user');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};


// // Get a single order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await OrderDetail.findById(req.params.id).populate('user');

//     if (!order) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Order not found',
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         order,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'error',
//       message: error.message,
//     });
//   }
// };

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const order = await OrderDetail.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};