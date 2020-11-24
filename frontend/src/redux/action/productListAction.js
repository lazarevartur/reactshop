import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from '../type'
import axios from 'axios'

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(productListReq())

    const { data } = await axios.get('/api/products/')

    dispatch(productListScs(data))
  } catch (error) {
    dispatch(productListFail(error))
  }
}
export const getDetailProduct = (id) => async (dispatch) => {
  try {
    dispatch(productDetailReq())

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(productDetailScs(data))
  } catch (error) {
    console.log(error)
    dispatch(productDetailFail(error.message))
  }
}

const productListReq = () => ({ type: PRODUCT_LIST_REQUEST })
const productListScs = (data) => ({ type: PRODUCT_LIST_SUCCESS, payload: data })
const productListFail = (error) => ({
  type: PRODUCT_LIST_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})
const productDetailReq = () => ({ type: PRODUCT_DETAIL_REQUEST })
const productDetailScs = (data) => ({
  type: PRODUCT_DETAIL_SUCCESS,
  payload: data,
})
const productDetailFail = (error) => ({
  type: PRODUCT_DETAIL_FAIL,
  payload: error,
})
