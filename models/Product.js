const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'T-Shirt' },
  sizes: [{ type: String }],
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
