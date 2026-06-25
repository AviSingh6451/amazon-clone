const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken')

// Middleware to check if user is logged in
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

// GET CART
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId })
    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [] })
    }
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ADD TO CART
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body
    let cart = await Cart.findOne({ userId: req.userId })

    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [] })
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({ productId, title, price, image, quantity: 1 })
    }

    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// REMOVE FROM CART
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId })
    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId
    )
    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// UPDATE QUANTITY
router.put('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body
    let cart = await Cart.findOne({ userId: req.userId })
    const item = cart.items.find(
      item => item.productId.toString() === req.params.productId
    )
    if (item) {
      item.quantity = quantity
      if (quantity <= 0) {
        cart.items = cart.items.filter(
          item => item.productId.toString() !== req.params.productId
        )
      }
    }
    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CLEAR CART
router.delete('/clear', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId })
    cart.items = []
    await cart.save()
    res.status(200).json({ message: 'Cart cleared' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router