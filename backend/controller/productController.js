import asyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'

// @desc Fetch all product
// @route /api/products
// @access Public
export const getProduct = asyncHandler(async(req, res) => {
  const products = await Product.find({})
  res.json(products)
})
// @desc Fetch single product
// @route /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})