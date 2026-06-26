const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      title: String,
      price: Number,
      image: String,
      category: String
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Wishlist', wishlistSchema)