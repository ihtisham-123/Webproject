const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challengeType: {
    type: String,
    required: true,
    enum: ['PHASE-1', 'PHASE-2', 'standard', 'aggressive', 'expert'], // Include the new values

  },
  accountSize: {
    type: String,
    required: true,
     enum: ['1000','3000','5000', '10000', '25000', '50000','100000','200000'],
  },
  platform: {
    type: String,
    required: true,
    enum: ['mt4', 'mt5', 'ctrader'],
  },
  couponCode: {
    type: String,
  },
  transactionId: {
    type: String,
    required: true,
  },
  paymentProof: {
    type: String, // Assuming you store the file path or URL as a string
  },
  total: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;