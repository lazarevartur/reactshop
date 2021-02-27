import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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
    totalPrice,
  } = req.body;
  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order items");
  } else {
    const order = new Order({
      user: req.userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPriceItems,
      shippingPrice,
      tax,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Fetch single order
// @route /api/order/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(req.userId);

  if (order && user) {
    order.user = user;
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
