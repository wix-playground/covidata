import { ACTIONS } from './actions'

export const initialState = {
  countries: [],
  tracked: [],
  globalData: {},
  error: null,
  labels: [],
  data: [0],
  pending: true
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
    case ACTIONS.SET_COUNTRY_TRACKED: {
      if (action.payload.value) {
        return {
          ...state,
          tracked: [...state.tracked, action.payload.countrySlug]
        }
      } else {
        return {
          ...state,
          tracked: state.tracked.filter(elem =>
            elem !== action.payload.countrySlug)
        }
      }
    }
    default: {
      return state
    }
  }
}
