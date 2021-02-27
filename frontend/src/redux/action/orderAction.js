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

export const resetDetailOrder = () => ({ type: ORDER_DETAIL_RESET });
export const resetCreateOrder = () => ({ type: ORDER_CREATE_RESET });

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
