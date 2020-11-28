import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../type';

export const authUser = ({email, password}) => async (dispatch) => {
  try {
    dispatch(userLoginReq())
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(email)
    const {data} = await axios.post(`/api/users/login/`, {
      email, password
    }, config)
//TODO авторизация
    dispatch(userLoginScs(data))
  } catch (e) {

  }
}
const userLoginReq = () => ({type: USER_LOGIN_REQUEST})
const userLoginScs = (data) => ({type: USER_LOGIN_SUCCESS, payload: data})
const userLoginFail = (error) => ({
  type: USER_LOGIN_FAIL,
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
})