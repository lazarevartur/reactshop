import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import loginRoutes from './routes/loginRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())
connectDB()

app.get('/', (req, res) => {
  res.send('API is runing...')
})
app.use('/api/products', productRoutes)
app.use('/api/users', loginRoutes)
// не найден путь
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server run in ${process.env.NODE_ENV} on PORT ${PORT}...`.yellow.bold
  )
)
