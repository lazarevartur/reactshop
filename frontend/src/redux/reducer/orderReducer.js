import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_RESET,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  ORDERS_RESET,
} from "../type";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
const initialStateOrderDetail = { order: {}, loading: true };

export const orderDetailReducer = (state = initialStateOrderDetail, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        order: { ...action.payload },
        loading: false,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAIL_RESET:
      return initialStateOrderDetail;
    default:
      return state;
  }
};

export const orderPayReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

const initialStateOrders = { orders: [], loading: false };

export const ordersReducer = (state = initialStateOrders, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDERS_SUCCESS:
      return {
        orders: [...action.payload],
        loading: false,
      };
    case ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDERS_RESET:
      return initialStateOrderDetail;
    default:
      return state;
  }
};
