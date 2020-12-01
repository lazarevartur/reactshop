import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { errorThrow } from '../utils/util.js';

const protect = asyncHandler(async (req, res, next) => {
  let token
// проверяем токен авторизации юзера
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // получаем токен авторизации

      token = req.headers.authorization.split(' ')[1]
      // получаем id юзера
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // кладем id в запрос
      req.userId = await User.findById(decoded.id).select('_id')
      // переходим к следуйшиму посреднику
      next()
    } catch (e) {
      console.error(e)
      errorThrow(e.message, 401, res)
    }
  }

  if (!token) {
    errorThrow('invalid Email or Password', 401, res)
  }

})
export default protect