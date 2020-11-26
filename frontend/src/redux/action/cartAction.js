import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../type'
import axios from 'axios';

export const cartAddItem = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${ id }`)
  const {name, image, price, _id, countInStock} = data
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name,
      _id,
      image,
      price,
      countInStock,
      qty
    }
  })
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}
export const cartRemoveItem = (_id) => (dispatch, getState) => {
  dispatch( {
    type: CART_REMOVE_ITEM,
    payload: _id
  })
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}