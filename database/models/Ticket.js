const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  serverId: { type: String, required: true },
  type: { type: String, enum: ['shop', 'kit', 'base', 'other'], default: 'shop' },
  status: {
    type: String,
    enum: ['open', 'pending', 'fulfilled', 'cancelled'],
    default: 'open',
  },
  items: [{
    name: String,
    className: String,
    price: Number,
    qty: { type: Number, default: 1 },
  }],
  total: { type: Number, default: 0 },
  isKit: { type: Boolean, default: false },
  kitId: { type: String, default: null },
  notes: { type: String, default: '' },
  channelId: { type: String, default: null },
  fulfilledBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
