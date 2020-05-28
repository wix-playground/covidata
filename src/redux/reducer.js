import { FETCH_COUNTRY_DATA_SUCCESS, FETCH_FAILURE, FETCH_SUMMARY_SUCCESS } from './actions'
import { initialState } from './configure-store'

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUMMARY_SUCCESS: {
      return {
        ...state,
        countries: action.payload.countries,
        globalData: action.payload.globalData
      }
    }
    case FETCH_COUNTRY_DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        labels: action.payload.labels
      }
    }
    case FETCH_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
