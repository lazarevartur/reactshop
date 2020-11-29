import {
  USER_CLEAN_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL, USER_REGISTER_REQUEST
} from '../type';
import { storage } from '../../utils/util';

const initialState = storage('userInfo') ? storage('userInfo') : {}
export const authReducer = (state = {userInfo: initialState}, action) => {
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
    case USER_REGISTER_REQUEST:
      return {loading: true}
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
