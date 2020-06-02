import { ACTIONS, fetchCountryStatsAction, fetchSummaryAction, setCountryTrackedAction } from '../redux/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ASYNC_STORAGE_TRACKED_KEY } from '../strings'
import AsyncStorage from '@react-native-community/async-storage'
import covidApi from '../api/covid-api'
import { initialState, reducer } from '../redux/reducer'

describe('Redux unit tests', () => {
  describe('reducer', () => {
    it('should return the initial state by default', () => {
      expect(reducer()).toEqual(initialState)
    })

    it('ACTIONS.GET_COUNTRY_STATS_SUCCESS', () => {
      const action = {
        type: ACTIONS.GET_COUNTRY_STATS_SUCCESS,
        payload: { data, labels }
      }
      const expected = {
        countries: initialState.countries,
        tracked: initialState.tracked,
        globalData: initialState.globalData,
        error: initialState.error,
        labels,
        data,
        pending: false
      }

      expect(reducer(undefined, action)).toEqual(expected)
    })
  })

  describe('actions', () => {
    it('should dispatch expected actions with setCountryTrackedAction', () => {
      const expectedAction = { type: ACTIONS.SET_COUNTRY_TRACKED, payload: { countrySlug, value } }

      expect(setCountryTrackedAction(countrySlug, value)).toEqual(expectedAction)
    })

    it('should dispatch expected actions with fetchSummaryAction', async () => {
      const expectedActions = [
        { type: ACTIONS.GET_SUMMARY_PENDING },
        { type: ACTIONS.GET_ASYNC_STORAGE_TRACKED, payload: { tracked } },
        { type: ACTIONS.GET_SUMMARY_SUCCESS, payload: { countries, globalData } }
      ]

      await AsyncStorage.setItem(ASYNC_STORAGE_TRACKED_KEY, JSON.stringify(tracked))
      const store = configureMockStore([thunk])()

      await store.dispatch(fetchSummaryAction())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch expected actions with fetchCountryStatsAction', async () => {
      const expectedActions = [
        { type: ACTIONS.GET_COUNTRY_STATS_PENDING },
        { type: ACTIONS.GET_COUNTRY_STATS_SUCCESS, payload: { data, labels } }
      ]

      const store = configureMockStore([thunk])()
      await store.dispatch(fetchCountryStatsAction())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

const tracked = ['test1', 'test2']
const countrySlug = 'testSlug'
const value = true
const globalData = {
  NewConfirmed: 123
}
const countries = [{
  Country: 'Atlantis'
}]
const labels = ['06-01', '06-02']
const data = [123, 456]

covidApi.getCountryStats = jest.fn().mockResolvedValue({ labels, data })
covidApi.getSummary = jest.fn().mockResolvedValue({ globalData, countries })
