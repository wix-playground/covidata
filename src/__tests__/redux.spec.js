import { ACTIONS, fetchCountryStats, fetchSummary, setCountryTracked } from '../redux/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ASYNC_STORAGE_TRACKED_KEY } from '../strings'
import AsyncStorage from '@react-native-community/async-storage'
import covidApi from '../api/covid-api'
import { reducer } from '../redux/reducer'

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
      const expected = { ...initialState, labels, data, pending: false }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('ACTIONS.GET_COUNTRY_STATS_FAILURE', () => {
      const action = { type: ACTIONS.GET_COUNTRY_STATS_FAILURE, error }
      const expected = { ...initialState, error, pending: false }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('ACTIONS.GET_COUNTRY_STATS_PENDING', () => {
      const action = { type: ACTIONS.GET_COUNTRY_STATS_PENDING }
      const expected = { ...initialState, pending: true }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('ACTIONS.GET_SUMMARY_SUCCESS', () => {
      const action = {
        type: ACTIONS.GET_SUMMARY_SUCCESS,
        payload: { countries, globalData }
      }
      const expected = { ...initialState, countries, globalData, pending: false }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('ACTIONS.GET_SUMMARY_FAILURE', () => {
      const action = { type: ACTIONS.GET_SUMMARY_FAILURE, error }
      const expected = { ...initialState, error, pending: false }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('ACTIONS.GET_SUMMARY_PENDING', () => {
      const action = { type: ACTIONS.GET_SUMMARY_PENDING }
      const expected = { ...initialState, pending: true }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    describe('ACTIONS.SET_COUNTRY_TRACKED', () => {
      it('works correctly with value=true', () => {
        const actionTrackedTrue = {
          type: ACTIONS.SET_COUNTRY_TRACKED,
          payload: { value: true, countrySlug }
        }
        const expected = { ...initialState, tracked: [countrySlug] }

        expect(reducer(initialState, actionTrackedTrue)).toEqual(expected)
      })

      it('works correctly with value=false', () => {
        const actionTrackedFalse = {
          type: ACTIONS.SET_COUNTRY_TRACKED,
          payload: { value: false, countrySlug }
        }
        const expected = { ...initialState }

        expect(reducer({ ...initialState, tracked: [countrySlug] }, actionTrackedFalse)).toEqual(expected)
      })
    })

    it('ACTIONS.GET_ASYNC_STORAGE_TRACKED', () => {
      const action = {
        type: ACTIONS.GET_ASYNC_STORAGE_TRACKED,
        payload: { tracked }
      }
      const expected = { ...initialState, tracked }

      expect(reducer(undefined, action)).toEqual(expected)
    })
  })

  describe('actions', () => {
    let store

    beforeEach(() => {
      store = configureMockStore([thunk])()
    })

    it('should dispatch expected actions with setCountryTrackedAction', async () => {
      const expectedActions = [{ type: ACTIONS.SET_COUNTRY_TRACKED, payload: { countrySlug, value } }]
      await store.dispatch(setCountryTracked(countrySlug, value))

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch expected actions with fetchSummaryAction', async () => {
      const expectedActions = [
        { type: ACTIONS.GET_SUMMARY_PENDING },
        { type: ACTIONS.GET_ASYNC_STORAGE_TRACKED, payload: { tracked } },
        { type: ACTIONS.GET_SUMMARY_SUCCESS, payload: { countries, globalData } }
      ]

      await AsyncStorage.setItem(ASYNC_STORAGE_TRACKED_KEY, JSON.stringify(tracked))
      await store.dispatch(fetchSummary())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('should dispatch expected actions with fetchCountryStatsAction', async () => {
      const expectedActions = [
        { type: ACTIONS.GET_COUNTRY_STATS_PENDING },
        { type: ACTIONS.GET_COUNTRY_STATS_SUCCESS, payload: { data, labels } }
      ]

      await store.dispatch(fetchCountryStats())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

const countrySlug = 'testSlug'
const tracked = [countrySlug]
const value = true
const globalData = {
  NewConfirmed: 123
}
const countries = [{
  Country: 'Atlantis'
}]
const labels = ['06-01', '06-02']
const data = [123, 456]
const initialState = {
  countries: [],
  tracked: [],
  globalData: {},
  error: null,
  labels: [],
  data: [0],
  pending: true
}
const error = new Error()

covidApi.getCountryStats = jest.fn().mockResolvedValue({ labels, data })
covidApi.getSummary = jest.fn().mockResolvedValue({ globalData, countries })
