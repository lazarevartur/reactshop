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

const orderSchema = mongoose.Schema(
  {
    // Пользователь который добавил в БД запись. Его id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // отношение между продуктом и юзером
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAdress: {
      adress: { type: String, required: true },
      city: { type: String, required: true },
      postCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      emeail_adress: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shipingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order