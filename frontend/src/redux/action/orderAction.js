import axios from 'axios'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../type'

export const createOrder = (order) => async (dispatch, getState) => {
  const {userLogin: {userInfo}} = getState()
  try {
    dispatch(orderCreateReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.post(`/api/order`, order, config)
    dispatch(orderCreateScs(data))
  } catch (e) {
    dispatch(orderCreateFail(e))
  }
}

const orderCreateReq = () => ({type: ORDER_CREATE_REQUEST})
const orderCreateScs = (data) => ({type: ORDER_CREATE_SUCCESS, payload: data})
const orderCreateFail = (error) => ({
  type: ORDER_CREATE_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})