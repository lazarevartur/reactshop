import {
  CART_ADD_ITEM,
  CART_CHANGE_CHECKOUT_PAGE,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../type";
import axios from "axios";
import { Storage } from "../../utils/util";

export const cartAddItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const { name, image, price, _id, countInStock } = data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name,
      _id,
      image,
      price,
      countInStock,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
export const cartRemoveItem = (_id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: _id,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
export const cartSaveAddress = (address) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  });
  Storage.save("shippingAddress", address);
};

export const cartSavePaymentMethod = (method) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  });
  Storage.save("paymentMethod", method);
};

export const cartChangeCheckOutPage = (page) => (dispatch) => {
  dispatch({
    type: CART_CHANGE_CHECKOUT_PAGE,
    payload: page,
  });
};

export const cartReset = () => (dispatch) => {
  dispatch({ type: CART_RESET });
  Storage.remove("cart");
};
