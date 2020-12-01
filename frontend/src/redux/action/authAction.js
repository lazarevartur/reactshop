import axios from 'axios';
import {
  USER_CLEAN_ERROR,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS
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
    dispatch(profile())
    storage('userInfo', data)
  } catch (e) {
    dispatch(userLoginFail(e))
  }
}
export const register = (candidate) => async (dispatch) => {
  try {
    dispatch(userRegisterReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post(`/api/users/`, candidate, config)
    dispatch(userRegisterScs(data))
    console.log(data)
    dispatch(userLoginScs(data))
  } catch (e) {
    dispatch(userRegisterFail(e))
  }
}

export const profile = (id = 'profile') => async (dispatch, getState) => {
  const {userLogin: {userInfo}} = getState()
  try {
    dispatch(userDetailReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/users/${id}`, config)
    storage('userDetail', data)
    dispatch(userDetailScs(data))
  } catch (e) {
    dispatch(userDetailFail(e))
  }
}

export const updateProfile = (data, id = 'profile') => async (dispatch, getState) => {
  const {userLogin: {userInfo}} = getState()

  try {
    dispatch(userUpdateProfileReq())
    // Устанавливаем заголовки в запросе типа json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    await axios.put(`/api/users/${id}`,{...data}, config)
    dispatch(userUpdateProfileScs())
    dispatch(profile())
  } catch (e) {
    dispatch(userUpdateProfileFail(e))
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
const userRegisterScs = (data) => ({type: USER_REGISTER_SUCCESS, payload: data})
const userRegisterFail = (error) => ({
  type: USER_REGISTER_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})

const userDetailReq = () => ({type: USER_DETAIL_REQUEST})
const userDetailScs = (data) => ({type: USER_DETAIL_SUCCESS, payload: data})
const userDetailFail = (error) => ({
  type: USER_DETAIL_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})

const userUpdateProfileReq = () => ({type: USER_UPDATE_PROFILE_REQUEST})
const userUpdateProfileScs = (data) => ({type: USER_UPDATE_PROFILE_SUCCESS, payload: data})
const userUpdateProfileFail = (error) => ({
  type: USER_UPDATE_PROFILE_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})


