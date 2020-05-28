import { reducer } from './reducer'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

export const initialState = {
  countries: [],
  tracked: [],
  globalData: {},
  error: null,
  labels: [],
  data: [0]
}

const middleware = [thunk]

export const store = createStore(reducer, initialState, applyMiddleware(...middleware))
