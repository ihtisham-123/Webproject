// const OrderDetail = require('../models/orderDetail');

const OrderDetail = require('../models/orderDetail');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { challengeType, accountSize, platform, couponCode, transactionId, paymentProof, total } = req.body;
    const userId = req.user.id; // Assuming you have user information in req.user

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

    await newOrder.save();

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