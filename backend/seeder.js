import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import Product from './models/productsModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // очищаем полностью нашу БД
    await Product.deleteMany()
    await Order.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUsers = createdUsers[0]._id
    const sampleProduct = products.map((p) => {
      return { ...p, user: adminUsers }
    })
    await Product.insertMany(sampleProduct)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // очищаем полностью нашу БД
    await Product.deleteMany()
    await Order.deleteMany()
    await User.deleteMany()

    console.log('Data destroyd!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
