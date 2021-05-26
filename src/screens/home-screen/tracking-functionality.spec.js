import {CountryDetailScreenDriver} from '../country-detail-screen/country-detail-screen.driver';
import {initialState, reducer} from '../../redux/reducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {HomeScreenDriver} from './home-screen.driver';
import AsyncStorage from '@react-native-community/async-storage';
import {CovidApi} from '../../api/covid-api';
import {i18n} from '../../../strings';

const testCountry = {
  country: 'Lithuania',
  countryCode: 'LT',
  slug: 'lithuania',
  newConfirmed: 15,
  totalConfirmed: 1562,
  newDeaths: 1,
  totalDeaths: 60,
  newRecovered: 28,
  totalRecovered: 1025,
  date: '2020-05-20T09:10:49Z',
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
      driver.dispatchCountryTrackedState(testCountry.slug, true);

      expect(driver.countryIsTracked(testCountry.slug)).toBeTruthy();
    });

    it('should alter the global list of tracked countries on switch toggle', () => {
      expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();
      driver.tapSwitch(); // enable

      expect(driver.countryIsTracked(testCountry.slug)).toBeTruthy();

      driver.tapSwitch(); // disable

      expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();
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
        expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();

        driver.dispatchCountryTrackedState(testCountry.slug, true);

        expect(homeDriver.containsCountry(testCountry.slug)).toBeTruthy();
      });

      it('should show a tracked country on the home screen on switch toggle', async () => {
        expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();

        driver.tapSwitch(); // enable

        expect(homeDriver.containsCountry(testCountry.slug)).toBeTruthy();
      });
    });
  });

  describe('Testing persistence', () => {
    it('should save data to async storage on state.tracked change', () => {
      const jsonSpy = jest.spyOn(JSON, 'stringify');
      const expectedSave = [testCountry.slug];
      const expectedJson = JSON.stringify(expectedSave);

      expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();

      driver.dispatchCountryTrackedState(testCountry.slug, true);

      expect(jsonSpy).toHaveBeenCalledWith(expectedSave);
      expect(AsyncStorage.setItem).toBeCalledWith(
        i18n('ASYNC_STORAGE_TRACKED_KEY'),
        expectedJson,
      );
    });

    it('should restore data from async storage on re-render', async () => {
      expect(driver.countryIsTracked(testCountry.slug)).toBeFalsy();
      driver.tapSwitch();

      expect(driver.countryIsTracked(testCountry.slug)).toBeTruthy();

      // Clear existing store
      store = createStore(reducer, initialState, applyMiddleware(...[thunk]));

      // Async storage gets fetched and set in state on home screen render
      await new HomeScreenDriver(store).renderAsync();

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(
        i18n('ASYNC_STORAGE_TRACKED_KEY'),
      );
      await expect(driver.countryIsTracked(testCountry.slug)).toBeTruthy();
    });
  });
});
