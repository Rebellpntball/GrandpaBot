const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  type: {
    type: String,
    enum: ['admin_adjust', 'pay', 'shop', 'daily', 'kill_reward', 'bounty', 'refund', 'other'],
    required: true,
  },
  amount: { type: Number, required: true },
  balanceAfter: { type: Number },
  reason: { type: String, default: '' },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
