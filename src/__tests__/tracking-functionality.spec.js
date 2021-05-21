import {CountryDetailScreenDriver} from './utils/country-detail-screen-driver';
import {initialState, reducer} from '../redux/reducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {HomeScreenDriver} from './utils/home-screen-driver';
import {ASYNC_STORAGE_TRACKED_KEY} from '../strings';
import AsyncStorage from '@react-native-community/async-storage';
import CovidApi from '../api/covid-api';

const testCountry = {
  Country: 'Lithuania',
  CountryCode: 'LT',
  Slug: 'lithuania',
  NewConfirmed: 15,
  TotalConfirmed: 1562,
  NewDeaths: 1,
  TotalDeaths: 60,
  NewRecovered: 28,
  TotalRecovered: 1025,
  Date: '2020-05-20T09:10:49Z',
};

CovidApi.getSummary = jest
  .fn()
  .mockResolvedValue({globalData: {}, countries: [testCountry]});

describe('Country tracking functionality', () => {
  let driver;
  let store;
  let storeDispatchSpy;

  beforeEach(async () => {
    store = createStore(reducer, initialState, applyMiddleware(...[thunk]));
    storeDispatchSpy = jest.spyOn(store, 'dispatch');
    driver = new CountryDetailScreenDriver(store, {country: testCountry});
    await driver.renderAsync();
    await AsyncStorage.clear();
  });

  describe('Tests without persistence', () => {
    it('should toggle switch state on press', () => {
      expect(driver.getSwitchValue()).toBeFalsy();
      driver.tapSwitch();

      expect(driver.getSwitchValue()).toBeTruthy();
    });

    it('should change global tracking state on action dispatch', () => {
      driver.dispatchCountryTrackedState(testCountry.Slug, true);

      expect(driver.countryIsTracked(testCountry.Slug)).toBeTruthy();
    });

    it('should alter the global list of tracked countries on switch toggle', () => {
      expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();
      driver.tapSwitch(); // enable

      expect(driver.countryIsTracked(testCountry.Slug)).toBeTruthy();

      driver.tapSwitch(); // disable

      expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();
    });

    describe('integration with home screen', () => {
      let homeDriver;

      beforeEach(async () => {
        homeDriver = new HomeScreenDriver(store);
        await homeDriver.renderAsync();
      });

      it('should display a flat list for tracked countries', () => {
        expect(homeDriver.containsTrackedCountryList()).toBeTruthy();
      });

      it('should display the country in a list when action dispatched', () => {
        expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();

        driver.dispatchCountryTrackedState(testCountry.Slug, true);

        expect(homeDriver.containsCountry(testCountry.Slug)).toBeTruthy();
      });

      it('should show a tracked country on the home screen on switch toggle', async () => {
        expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();

        driver.tapSwitch(); // enable

        expect(homeDriver.containsCountry(testCountry.Slug)).toBeTruthy();
      });
    });
  });

  describe('Testing persistence', () => {
    it('should save data to async storage on state.tracked change', () => {
      const jsonSpy = jest.spyOn(JSON, 'stringify');
      const expectedSave = [testCountry.Slug];
      const expectedJson = JSON.stringify(expectedSave);

      expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();

      driver.dispatchCountryTrackedState(testCountry.Slug, true);

      expect(jsonSpy).toHaveBeenCalledWith(expectedSave);
      expect(AsyncStorage.setItem).toBeCalledWith(
        ASYNC_STORAGE_TRACKED_KEY,
        expectedJson,
      );
    });

    it('should restore data from async storage on re-render', async () => {
      expect(driver.countryIsTracked(testCountry.Slug)).toBeFalsy();
      driver.tapSwitch();

      expect(driver.countryIsTracked(testCountry.Slug)).toBeTruthy();

      // Clear existing store
      store = createStore(reducer, initialState, applyMiddleware(...[thunk]));

      // Async storage gets fetched and set in state on home screen render
      await new HomeScreenDriver(store).renderAsync();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(
        ASYNC_STORAGE_TRACKED_KEY,
      );
      await expect(driver.countryIsTracked(testCountry.Slug)).toBeTruthy();
    });
  });
});
