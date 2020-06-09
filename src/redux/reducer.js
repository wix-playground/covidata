import { ACTIONS } from './actions'
import { ASYNC_STORAGE_TRACKED_KEY } from '../strings'
import AsyncStorage from '@react-native-community/async-storage'
import {computeNewTrackedCountries} from '../utils/helper-methods';

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
  switch (action?.type) {
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
