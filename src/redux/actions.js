import covidApi from '../api/covid-api'

export const ACTIONS = {
  GET_SUMMARY_PENDING: 'GET_SUMMARY_PENDING',
  GET_SUMMARY_SUCCESS: 'GET_SUMMARY_SUCCESS',
  GET_SUMMARY_FAILURE: 'GET_SUMMARY_FAILURE',
  GET_COUNTRY_STATS_PENDING: 'GET_COUNTRY_STATS_PENDING',
  GET_COUNTRY_STATS_SUCCESS: 'GET_COUNTRY_STATS_SUCCESS',
  GET_COUNTRY_STATS_FAILURE: 'GET_COUNTRY_STATS_FAILURE',
  SET_COUNTRY_TRACKED: 'SET_COUNTRY_TRACKED'
}

export const setCountryTrackedAction = (countrySlug, value) => {
  return {
    type: ACTIONS.SET_COUNTRY_TRACKED,
    payload: { countrySlug, value }
  }
}

export function fetchSummaryAction () {
  return async (dispatch) => {
    dispatch({ type: ACTIONS.GET_SUMMARY_PENDING })
    try {
      const { countries, globalData } = await covidApi.getSummary()
      dispatch({ type: ACTIONS.GET_SUMMARY_SUCCESS, payload: { countries, globalData } })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_SUMMARY_FAILURE, error: { error } })
    }
  }
}

export function fetchCountryStatsAction (countrySlug) {
  return async (dispatch) => {
    dispatch({ type: ACTIONS.GET_COUNTRY_STATS_PENDING })
    try {
      const { labels, data } = await covidApi.getCountryStats(countrySlug)
      dispatch({ type: ACTIONS.GET_COUNTRY_STATS_SUCCESS, payload: { labels, data } })
    } catch (error) {
      dispatch({ type: ACTIONS.GET_COUNTRY_STATS_FAILURE, error: { error } })
    }
  }
}
