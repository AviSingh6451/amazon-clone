const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ADD PRODUCT
router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body
    const product = await Product.create({
      title,
      description,
      price,
      image,
      category
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router