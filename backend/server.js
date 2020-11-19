import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
console.log()
dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('API is runing...')
})
app.get('/api/product', (req, res) => {
  res.json(products)
})
app.get('/api/product/:id', (req, res) => {
  const product = products.find((product) => req.params.id === product._id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server run in ${process.env.NODE_ENV} on PORT ${PORT}...`)
)
