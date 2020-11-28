import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import { errorThrow } from '../utils/util.js';


// @desc Auth user && get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {

  const {email, password} = req.body
  // ищем в базе пользователя по email
  const user = await User.findOne({email})
  // проверяем есть ли пользователь и если есть проверяем его пароль
  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

})

// @desc Register new user
// @route POST /api/users/
// @access Public
export const regUser = asyncHandler(async (req, res) => {

  const {email, password} = req.body
  // ищем в базе пользователя по email
  const userExists = await User.findOne({email})
  if (userExists) {
    errorThrow('User already exists', 400, res)
  }
  const newUser = {
    email,
    password
  }
  const user = await User.create(newUser)
  if (user) {
    res.json(getCurrentUser(user))
  } else {
    errorThrow('Invalid user data', 400, res)
  }
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private
export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId._id)
  if (user) {
    res.json(getCurrentUser(user))
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }

})

const getCurrentUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  }
}