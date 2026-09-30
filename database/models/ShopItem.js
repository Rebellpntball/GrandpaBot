const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  catalog: { type: String, default: 'default', index: true },
  className: { type: String, required: true },
  displayName: { type: String, required: true },
  category: { type: String, default: 'Misc', index: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  minPrice: { type: Number },
  maxPrice: { type: Number },
  enabled: { type: Boolean, default: true },
  isKit: { type: Boolean, default: false },
  kitData: { type: mongoose.Schema.Types.Mixed, default: null },
});

shopItemSchema.index({ catalog: 1, className: 1 }, { unique: true });

module.exports = mongoose.model('ShopItem', shopItemSchema);
