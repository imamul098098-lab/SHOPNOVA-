const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    country: { type: String, default: 'Pakistan' },
    phone: { type: String, required: true }
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['card', 'bank_transfer', 'payoneer', 'cash_on_delivery']
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  totalAmount: { type: Number, required: true },
  trackingNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);