import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_RESET,
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
  ORDERS_RESET,
} from "../type";

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch(orderCreateReq());
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/order`, order, config);
    dispatch(orderCreateScs(data));
  } catch (e) {
    dispatch(orderCreateFail(e));
  }
};

export const getDetailOrder = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch(orderDetailReq());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch(orderDetailScs(data));
  } catch (error) {
    console.log(error);
    dispatch(orderDetailFail(error.message));
  }
};

export const getOrders = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch(ordersReq());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/myorder`, config);
    dispatch(ordersScs(data));
  } catch (error) {
    console.log(error);
    dispatch(ordersFail(error.message));
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch(orderPayReq());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/order/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch(orderPayScs(data));
  } catch (error) {
    console.log(error);
    dispatch(orderPayFail(error.message));
  }
};

export const resetDetailOrder = () => ({ type: ORDER_DETAIL_RESET });
export const resetCreateOrder = () => ({ type: ORDER_CREATE_RESET });
export const resetPayOrder = () => ({ type: ORDER_PAY_RESET });
export const resetOrders = () => ({ type: ORDERS_RESET });

const orderCreateReq = () => ({ type: ORDER_CREATE_REQUEST });
const orderCreateScs = (data) => ({
  type: ORDER_CREATE_SUCCESS,
  payload: data,
});
const orderCreateFail = (error) => ({
  type: ORDER_CREATE_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

const orderDetailReq = () => ({ type: ORDER_DETAIL_REQUEST });
const orderDetailScs = (data) => ({
  type: ORDER_DETAIL_SUCCESS,
  payload: data,
});
const orderDetailFail = (error) => ({
  type: ORDER_DETAIL_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

const ordersReq = () => ({ type: ORDERS_REQUEST });
const ordersScs = (data) => ({
  type: ORDERS_SUCCESS,
  payload: data,
});
const ordersFail = (error) => ({
  type: ORDERS_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

const orderPayReq = () => ({ type: ORDER_PAY_REQUEST });
const orderPayScs = (data) => ({
  type: ORDER_PAY_SUCCESS,
  payload: data,
});
const orderPayFail = (error) => ({
  type: ORDER_PAY_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});
