import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ACTIONS,
  fetchCountryStats,
  fetchCovidNews,
  fetchSummary,
  setCountryTracked,
} from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import {ASYNC_STORAGE_TRACKED_KEY} from '../strings';
import {
  articles,
  countries,
  countrySlug,
  globalData,
  labels,
  tracked,
  data,
} from './reducer.spec';
import {CovidApi} from '../api/covid-api';
import {NewsApi} from '../api/news-api';

const value = true;

describe('actions', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(CovidApi, 'getCountryStats')
      .mockResolvedValueOnce({labels, data});
    jest
      .spyOn(CovidApi, 'getSummary')
      .mockResolvedValueOnce({globalData, countries});
    jest
      .spyOn(NewsApi, 'getTopCovidHeadlines')
      .mockResolvedValueOnce({articles});
    store = configureMockStore([thunk])();
  });

  it('should dispatch expected actions with setCountryTrackedAction', async () => {
    const expectedActions = [
      {type: ACTIONS.SET_COUNTRY_TRACKED, payload: {countrySlug, value}},
    ];
    await store.dispatch(setCountryTracked(countrySlug, value));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch expected actions with fetchSummaryAction', async () => {
    const expectedActions = [
      {type: ACTIONS.GET_SUMMARY_PENDING},
      {type: ACTIONS.GET_ASYNC_STORAGE_TRACKED, payload: {tracked}},
      {type: ACTIONS.GET_SUMMARY_SUCCESS, payload: {countries, globalData}},
    ];

    await AsyncStorage.setItem(
      ASYNC_STORAGE_TRACKED_KEY,
      JSON.stringify(tracked),
    );
    await store.dispatch(fetchSummary());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch expected actions with fetchCountryStatsAction', async () => {
    const expectedActions = [
      {type: ACTIONS.GET_COUNTRY_STATS_PENDING},
      {type: ACTIONS.GET_COUNTRY_STATS_SUCCESS, payload: {data, labels}},
    ];

    await store.dispatch(fetchCountryStats());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch expected actions with fetchCovidNewsAction', async () => {
    const expectedActions = [
      {type: ACTIONS.GET_COVID_NEWS_PENDING},
      {type: ACTIONS.GET_COVID_NEWS_SUCCESS, payload: {articles}},
    ];

    await store.dispatch(fetchCovidNews());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
