import {COUNTRIES_UPDATED} from './constants';
import {createStore} from 'redux';

const initialState = {
  countries: [],
  tracked: [],
  globalData: {}
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_UPDATED: {
      return {
        ...state,
        countries: action.payload.countries,
        globalData: action.payload.globalData
      }
    }
    default: {
      return state
    }
  }
}
export const store = createStore(reducer)