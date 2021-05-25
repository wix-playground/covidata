import { initialState, reducer } from './reducer'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const middleware = [thunk]

export const store = createStore(reducer, initialState, applyMiddleware(...middleware))
