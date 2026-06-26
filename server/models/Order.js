const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: String,
      title: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  status: {
    type: String,
    default: 'Delivered'
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)