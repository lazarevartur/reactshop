import {
  CART_ADD_ITEM,
  CART_CHANGE_CHECKOUT_PAGE,
  CART_REMOVE_ITEM,
  CART_REMOVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET,
} from "../type";
import { Storage } from "../../utils/util";

const initialState = {
  cartItems: Storage.has("cart") ? Storage.get("cart") : [],
  checkout: {
    shippingAddress: Storage.has("shippingAddress")
      ? Storage.get("shippingAddress")
      : {},
    paymentMethod: Storage.has("paymentMethod")
      ? Storage.get("paymentMethod")
      : "",
    checkoutPage: 1,
  },
};
export const cartReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload;
      // проверяем на наличие в масиве товара
      const existItem = state.cartItems.find(
        (item) => product._id === item._id
      );
      if (existItem) {
        return {
          ...state,
          // если товар уже был добавлен, то возвращаем новый массив и изменяем поступивший товар
          cartItems: state.cartItems.map((oldItem) =>
            oldItem._id === existItem._id ? product : oldItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    case CART_REMOVE_ITEM:
      const filteredItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        cartItems: filteredItems,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          shippingAddress: action.payload,
        },
      };
    case CART_REMOVE_SHIPPING_ADDRESS:
      return {
        ...state,
        checkout: {
          shippingAddress: {},
          checkoutPage: 1,
        },
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          paymentMethod: action.payload,
        },
      };
    case CART_CHANGE_CHECKOUT_PAGE:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          checkoutPage: action.payload,
        },
      };
    case CART_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
//603ac458c783842c3013e4bc
