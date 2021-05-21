import CovidApi from '../api/covid-api';
import AsyncStorage from '@react-native-community/async-storage';
import {computeNewTrackedCountries} from '../utils/helper-methods';
import NewsApi from '../api/news-api';
import {Dispatch} from 'redux';
import {i18n} from '../../strings';

export const ACTIONS = {
  GET_SUMMARY_PENDING: 'GET_SUMMARY_PENDING',
  GET_SUMMARY_SUCCESS: 'GET_SUMMARY_SUCCESS',
  GET_SUMMARY_FAILURE: 'GET_SUMMARY_FAILURE',
  GET_COUNTRY_STATS_PENDING: 'GET_COUNTRY_STATS_PENDING',
  GET_COUNTRY_STATS_SUCCESS: 'GET_COUNTRY_STATS_SUCCESS',
  GET_COUNTRY_STATS_FAILURE: 'GET_COUNTRY_STATS_FAILURE',
  GET_COVID_NEWS_PENDING: 'GET_COVID_NEWS_PENDING',
  GET_COVID_NEWS_SUCCESS: 'GET_COVID_NEWS_SUCCESS',
  GET_COVID_NEWS_FAILURE: 'GET_COVID_NEWS_FAILURE',
  SET_COUNTRY_TRACKED: 'SET_COUNTRY_TRACKED',
  GET_ASYNC_STORAGE_TRACKED: 'GET_ASYNC_STORAGE_TRACKED',
};

export const setCountryTracked = (countrySlug: string, value: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ACTIONS.SET_COUNTRY_TRACKED,
      payload: {countrySlug, value},
    });
    const oldTracked =
      JSON.parse(
        (await AsyncStorage.getItem(
          i18n('ASYNC_STORAGE_TRACKED_KEY'),
        )) as string,
      ) ?? [];
    const newTracked = computeNewTrackedCountries(
      oldTracked,
      countrySlug,
      value,
    );
    await AsyncStorage.setItem(
      i18n('ASYNC_STORAGE_TRACKED_KEY'),
      JSON.stringify(newTracked),
    );
  };
};

export function fetchSummary() {
  return async (dispatch: Dispatch) => {
    dispatch({type: ACTIONS.GET_SUMMARY_PENDING});
    try {
      const {countries, globalData} = await CovidApi.getSummary();
      const tracked =
        JSON.parse(
          (await AsyncStorage.getItem(
            i18n('ASYNC_STORAGE_TRACKED_KEY'),
          )) as string,
        ) ?? [];
      dispatch({type: ACTIONS.GET_ASYNC_STORAGE_TRACKED, payload: {tracked}});
      dispatch({
        type: ACTIONS.GET_SUMMARY_SUCCESS,
        payload: {countries, globalData},
      });
    } catch (error) {
      dispatch({type: ACTIONS.GET_SUMMARY_FAILURE, error: {error}});
    }
  };
}

export function fetchCountryStats(countrySlug: string) {
  return async (dispatch: Dispatch) => {
    dispatch({type: ACTIONS.GET_COUNTRY_STATS_PENDING});
    try {
      const {labels, data} = await CovidApi.getCountryStats(countrySlug);
      dispatch({
        type: ACTIONS.GET_COUNTRY_STATS_SUCCESS,
        payload: {labels, data},
      });
    } catch (error) {
      dispatch({type: ACTIONS.GET_COUNTRY_STATS_FAILURE, error: {error}});
    }
  };
}

export function fetchCovidNews() {
  return async (dispatch: Dispatch) => {
    dispatch({type: ACTIONS.GET_COVID_NEWS_PENDING});
    try {
      const {articles} = await NewsApi.getTopCovidHeadlines();
      dispatch({type: ACTIONS.GET_COVID_NEWS_SUCCESS, payload: {articles}});
    } catch (error) {
      dispatch({type: ACTIONS.GET_COVID_NEWS_FAILURE, error: {error}});
    }
  };
}
