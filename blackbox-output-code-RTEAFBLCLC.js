const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['male-fashion', 'female-fashion', 'electronics', 'beauty', 'accessories']
  },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  images: [String],
  brand: String,
  specifications: mongoose.Schema.Types.Mixed,
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);