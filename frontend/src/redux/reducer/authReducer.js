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
  USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS
} from '../type';
import { storage } from '../../utils/util';

const initialState = storage('userInfo') ? {userInfo:storage('userInfo')} : null
export const authReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {loading: true}
    case USER_LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
        loading: false,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    case USER_CLEAN_ERROR:
      return {loading: false}
    default:
      return state
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true}
    case USER_REGISTER_SUCCESS:
      return {loading: false, newUser: action.payload}
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
let initialStateDetail = storage('userDetail') ? {user:storage('userDetail')} : null
  export const userDetailReducer = (state = {...initialStateDetail}, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {loading: true}
      case USER_DETAIL_SUCCESS:
      return {loading: false, user: action.payload }
    case USER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default: return state
  }
}
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true}
      case USER_UPDATE_PROFILE_SUCCESS:
      return {loading: false, success: true }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default: return state
  }
}