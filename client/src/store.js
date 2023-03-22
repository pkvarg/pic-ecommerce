import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { adminChatReducer } from './reducers/adminChatReducers'

const reducer = combineReducers({
  adminChat: adminChatReducer,
})

const preloadedState = {}

const middleware = [thunk]
const store = configureStore({
  reducer,
  preloadedState,
  middleware,
})

export default store
