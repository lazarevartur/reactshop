import axios from 'axios';
import {
  USER_CLEAN_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from '../type';
import { storage } from '../../utils/util';



export const login = ({email, password}) => async (dispatch) => {
  try {
    dispatch(userLoginReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post(`/api/users/login/`, {
      email, password
    }, config)
    dispatch(userLoginScs(data))
    storage('userInfo', data)
  } catch (e) {
    dispatch(userLoginFail(e))
  }
}
export const register = (candidate) => async (dispatch) => {
  console.log(candidate)
  try {
    dispatch(userRegisterReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post(`/api/users/`, candidate, config)
    dispatch(userRegisterScs())
    dispatch(userLoginScs(data))
    storage('userInfo', data)
  } catch (e) {
    dispatch(userRegisterFail(e))
  }
}
export const logout = () => (dispatch) => {
  dispatch(userLogout())
  localStorage.removeItem('userInfo')
}

export const userCleanError = () => ({type: USER_CLEAN_ERROR})

const userLogout = () => ({type: USER_LOGOUT})
const userLoginReq = () => ({type: USER_LOGIN_REQUEST})
const userLoginScs = (data) => ({type: USER_LOGIN_SUCCESS, payload: data})
const userLoginFail = (error) => ({
  type: USER_LOGIN_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})
const userRegisterReq = () => ({type: USER_REGISTER_REQUEST})
const userRegisterScs = () => ({type: USER_REGISTER_SUCCESS})
const userRegisterFail = (error) => ({
  type: USER_REGISTER_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})

