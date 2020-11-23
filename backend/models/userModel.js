import mongoose from 'mongoose'

// создание схемы юезра
// оперделяем все поля юезра
const userSchema = mongoose.Schema(
  {
    // name: String -добовление поля без доп параметров
    name: {
      // добовление поля с доп параметрами
      type: String,
      required: true,
    },
    email: {
      // добовление поля с доп параметрами
      type: String, // тип
      required: true, // опция обезательное поле
      unique: true, // уникальное значени
    },
    password: {
      // добовление поля с доп параметрами
      type: String,
      required: true,
    },
    isAdmin: {
      // добовление поля с доп параметрами
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // временаая метка
  }
)
// создаем модель юзера
const User = mongoose.model('User', userSchema)

export default User
