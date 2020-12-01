import asyncHandler from 'express-async-handler'
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
    res.json(getUserWithToken(user))
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

})

// @desc Register new user
// @route POST /api/users/
// @access Public
export const regUser = asyncHandler(async (req, res) => {

  const {email, password, name} = req.body
  // ищем в базе пользователя по email
  const userExists = await User.findOne({email})
  if (userExists) {
    errorThrow('User already exists', 400, res)
  }
  const newUser = {
    email,
    password,
    name
  }
  const user = await User.create(newUser)
  if (user) {
    res.json(getUserWithToken(user))
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
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId._id)
  console.log('sad')
  const {name, email, password} = req.body
  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if(password) {
      user.password = password
    }
    const updateUser = await user.save()
    res.json(getCurrentUser(updateUser))
  } else {
    res.status(401)
    throw new Error('auth Fail')
  }
})

const getCurrentUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }
}
const getUserWithToken = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  }
}