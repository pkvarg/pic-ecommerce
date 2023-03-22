import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { adminChatReducer } from './reducers/adminChatReducers'

const reducer = combineReducers({
  adminChat: adminChatReducer,
})

const INITIAL_STATE = {}

const middleware = [thunk]
const store = legacy_createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
