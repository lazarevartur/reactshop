import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../type'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

export const cartReducer = (state = {cartItems: [...initialState]}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload
      // проверяем на наличие в масиве товара
      const existItem = state.cartItems.find((item) => product._id === item._id )
      if (existItem) {
        return {
          ...state,
          // если товар уже был добавлен, то возвращаем новый массив и изменяем поступивший товар
          cartItems: state.cartItems.map((item) => item._id === existItem._id ? product : item )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product]
        }
      }
    default: return state
  }
}
