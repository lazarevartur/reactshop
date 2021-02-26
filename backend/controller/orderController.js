import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route /api/order
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPriceItems,
    shippingPrice,
    tax,
    totalPrice
  } = req.body
  if (!orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('no order items')
  } else {
    const order = new Order({
      user: req.userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPriceItems,
      shippingPrice,
      tax,
      totalPrice
    })
    const createdOrder = await order.save()
    console.log(createdOrder)
    res.status(201).json(createdOrder)
  }

})
