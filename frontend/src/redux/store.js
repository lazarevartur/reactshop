import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
} from './reducer/productReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  productsList: productListReducer,
  productDetail: productDetailReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
