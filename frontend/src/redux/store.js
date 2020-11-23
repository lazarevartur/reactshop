import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducer/productReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  products: productReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
