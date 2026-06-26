const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')
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

// GET WISHLIST
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId })
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.userId, items: [] })
    }
    res.status(200).json(wishlist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ADD TO WISHLIST
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, title, price, image, category } = req.body
    let wishlist = await Wishlist.findOne({ userId: req.userId })
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.userId, items: [] })
    }
    const exists = wishlist.items.find(
      item => item.productId.toString() === productId
    )
    if (exists) {
      return res.status(400).json({ message: 'Already in wishlist' })
    }
    wishlist.items.push({ productId, title, price, image, category })
    await wishlist.save()
    res.status(200).json(wishlist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// REMOVE FROM WISHLIST
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId })
    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== req.params.productId
    )
    await wishlist.save()
    res.status(200).json(wishlist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router