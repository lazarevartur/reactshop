import mongoose from 'mongoose'

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    // Пользователь который добавил в БД запись. Его id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // отношение между продуктом и юзером
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
