import { ACTIONS } from './actions'
import {computeNewTrackedCountries} from '../utils/helper-methods';

export const initialState = {
  countries: [],
  tracked: [],
  globalData: {},
  error: null,
  labels: [],
  data: [0],
  pending: true,
  articles: []
}
export const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case ACTIONS.GET_COUNTRY_STATS_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        labels: action.payload.labels,
        pending: false
      }
    }
    case ACTIONS.GET_COVID_NEWS_FAILURE:
    case ACTIONS.GET_COUNTRY_STATS_FAILURE: {
      return {
        ...state,
        error: action.error,
        pending: false
      }
    }
    case ACTIONS.GET_COVID_NEWS_PENDING:
    case ACTIONS.GET_COUNTRY_STATS_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    case ACTIONS.GET_COVID_NEWS_SUCCESS: {
      return {
        ...state,
        articles: action.payload.articles,
        pending: false
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
      const tracked = computeNewTrackedCountries(state.tracked, action.payload.countrySlug, action.payload.value)
      return {
        ...state,
        tracked
      }
    }
    case ACTIONS.GET_ASYNC_STORAGE_TRACKED: {
      return {
        ...state,
        tracked: action.payload.tracked
      }
    }
    default: {
      return state
    }
  }
}
