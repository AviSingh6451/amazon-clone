const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken')

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

// PLACE ORDER
router.post('/place', auth, async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body
    const order = await Order.create({
      userId: req.userId,
      items,
      totalAmount,
      address,
      status: 'Delivered'
    })
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET ORDER HISTORY
router.get('/history', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router