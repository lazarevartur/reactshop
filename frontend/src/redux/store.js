import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
} from './reducer/productReducer'
import { cartReducer } from './reducer/cartReducer'
import { authReducer, userDetailReducer, userRegisterReducer, userUpdateReducer } from './reducer/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  productsList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: authReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
