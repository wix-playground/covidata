import { ACTIONS } from './actions'

export const initialState = {
  countries: [],
  tracked: [],
  globalData: {},
  error: null,
  labels: [],
  data: [0],
  pending: false
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_COUNTRY_STATS_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        labels: action.payload.labels,
        pending: false
      }
    }
    case ACTIONS.GET_COUNTRY_STATS_FAILURE: {
      return {
        ...state,
        error: action.error,
        pending: false
      }
    }
    case ACTIONS.GET_COUNTRY_STATS_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    case ACTIONS.GET_SUMMARY_SUCCESS: {
      return {
        ...state,
        countries: action.payload.countries,
        globalData: action.payload.globalData,
        pending: false
      }
    }
    case ACTIONS.GET_SUMMARY_FAILURE: {
      return {
        ...state,
        error: action.error,
        pending: false
      }
    }
    case ACTIONS.GET_SUMMARY_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    default: {
      return state
    }
  }
}
