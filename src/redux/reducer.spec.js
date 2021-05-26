import {ACTIONS} from './actions';
import {reducer} from './reducer';
import {article} from '../screens/news-feed-screen/news-feed-screen.spec';

describe('reducer', () => {
  it('should return the initial state by default', () => {
    expect(reducer()).toEqual(initialState);
  });

  it('sets the historical data with date labels for a chosen country on ACTIONS.GET_COUNTRY_STATS_SUCCESS', () => {
    const action = {
      type: ACTIONS.GET_COUNTRY_STATS_SUCCESS,
      payload: {data, labels},
    };
    const expected = {...initialState, labels, data, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('sets the error on ACTIONS.GET_COUNTRY_STATS_FAILURE', () => {
    const action = {type: ACTIONS.GET_COUNTRY_STATS_FAILURE, error};
    const expected = {...initialState, error, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('starts country data fetch with ACTIONS.GET_COUNTRY_STATS_PENDING', () => {
    const action = {type: ACTIONS.GET_COUNTRY_STATS_PENDING};
    const expected = {...initialState, pending: true};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('sets fetched articles for related news on ACTIONS.GET_COVID_NEWS_SUCCESS', () => {
    const action = {
      type: ACTIONS.GET_COVID_NEWS_SUCCESS,
      payload: {articles},
    };
    const expected = {...initialState, articles, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('sets error object after article fetch failure on ACTIONS.GET_COVID_NEWS_FAILURE', () => {
    const action = {type: ACTIONS.GET_COVID_NEWS_FAILURE, error};
    const expected = {...initialState, error, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('starts fetching news feed articles with ACTIONS.GET_COVID_NEWS_PENDING', () => {
    const action = {type: ACTIONS.GET_COVID_NEWS_PENDING};
    const expected = {...initialState, pending: true};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('sets fetched global data on ACTIONS.GET_SUMMARY_SUCCESS', () => {
    const action = {
      type: ACTIONS.GET_SUMMARY_SUCCESS,
      payload: {countries, globalData},
    };
    const expected = {...initialState, countries, globalData, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('sets error object after failing to fetch global data with ACTIONS.GET_SUMMARY_FAILURE', () => {
    const action = {type: ACTIONS.GET_SUMMARY_FAILURE, error};
    const expected = {...initialState, error, pending: false};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('starts fetching global data on ACTIONS.GET_SUMMARY_PENDING', () => {
    const action = {type: ACTIONS.GET_SUMMARY_PENDING};
    const expected = {...initialState, pending: true};

    expect(reducer(undefined, action)).toEqual(expected);
  });

  describe('sets a country as being (un)tracked with ACTIONS.SET_COUNTRY_TRACKED', () => {
    it('works correctly with value=true', () => {
      const actionTrackedTrue = {
        type: ACTIONS.SET_COUNTRY_TRACKED,
        payload: {value: true, countrySlug},
      };
      const expected = {...initialState, tracked: [countrySlug]};

      expect(reducer(initialState, actionTrackedTrue)).toEqual(expected);
    });

    it('works correctly with value=false', () => {
      const actionTrackedFalse = {
        type: ACTIONS.SET_COUNTRY_TRACKED,
        payload: {value: false, countrySlug},
      };
      const expected = {...initialState};

      expect(
        reducer({...initialState, tracked: [countrySlug]}, actionTrackedFalse),
      ).toEqual(expected);
    });
  });

  it('gets tracked country list from async storage on ACTIONS.GET_ASYNC_STORAGE_TRACKED', () => {
    const action = {
      type: ACTIONS.GET_ASYNC_STORAGE_TRACKED,
      payload: {tracked},
    };
    const expected = {...initialState, tracked};

    expect(reducer(undefined, action)).toEqual(expected);
  });
});

export const countrySlug = 'testSlug';
export const tracked = [countrySlug];
export const globalData = {
  NewConfirmed: 123,
};
export const countries = [
  {
    Country: 'Atlantis',
  },
];
export const labels = ['06-01', '06-02'];
export const data = [123, 456];
export const articles = [article];
const initialState = {
  articles: [],
  countries: [],
  tracked: [],
  globalData: {
    newConfirmed: 0,
    newDeaths: 0,
    newRecovered: 0,
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
  },
  error: null,
  labels: [],
  data: [0],
  pending: true,
};
const error = new Error();
