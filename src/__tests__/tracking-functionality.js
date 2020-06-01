import { CountryDetailScreenDriver } from './utils/country-detail-screen-driver'
import { initialState, reducer } from '../redux/reducer'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { HomeScreenDriver } from './utils/home-screen-driver'

describe('Country tracking functionality', () => {
  let driver
  let store
  let storeDispatchSpy

  const country = {
    Country: 'Lithuania',
    CountryCode: 'LT',
    Slug: 'lithuania',
    NewConfirmed: 15,
    TotalConfirmed: 1562,
    NewDeaths: 1,
    TotalDeaths: 60,
    NewRecovered: 28,
    TotalRecovered: 1025,
    Date: '2020-05-20T09:10:49Z'
  }

  beforeEach(async () => {
    store = createStore(reducer, initialState, applyMiddleware(...[thunk]))
    storeDispatchSpy = jest.spyOn(store, 'dispatch')
    driver = new CountryDetailScreenDriver(store, { country })
    await driver.renderAsync()
  })

  it('should toggle switch state on press', () => {
    expect(driver.getSwitchValue()).toBeFalsy()
    driver.tapSwitch()

    expect(driver.getSwitchValue()).toBeTruthy()
  })

  it('should change global tracking state on action dispatch', () => {
    driver.dispatchCountryTrackedState(country.Slug, true)

    expect(driver.countryIsTracked(country.Slug)).toBeTruthy()
  })

  it('should dispatch tracking event on switch toggle', () => {
    driver.tapSwitch() // enable

    const trackCountry = driver.createTrackingDispatchArgument(country.Slug, true)

    expect(storeDispatchSpy).toHaveBeenLastCalledWith(trackCountry)
  })

  it('should alter the global list of tracked countries on switch toggle', () => {
    expect(driver.countryIsTracked(country.Slug)).toBeFalsy()
    driver.tapSwitch() // enable

    expect(driver.countryIsTracked(country.Slug)).toBeTruthy()

    driver.tapSwitch() // disable

    expect(driver.countryIsTracked(country.Slug)).toBeFalsy()
  })

  describe('integration with home screen', () => {
    let homeDriver

    beforeEach(async () => {
      homeDriver = new HomeScreenDriver(store)
      await homeDriver.renderAsync()
    })

    it('should display a list for tracked countries', () => {
      expect(homeDriver.containsTrackedCountryList()).toBeTruthy()
    })

    it('should display the country in a list when action dispatched', () => {
      expect(driver.countryIsTracked(country.Slug)).toBeFalsy()

      driver.dispatchCountryTrackedState(country.Slug, true)

      expect(homeDriver.containsCountry(country.Slug)).toBeTruthy()
    })

    it('should show a tracked country on the home screen on switch toggle', () => {
      expect(driver.countryIsTracked(country.Slug)).toBeFalsy()

      driver.tapSwitch() // enable
      const trackCountry = driver.createTrackingDispatchArgument(country.Slug, true)

      expect(storeDispatchSpy).toHaveBeenLastCalledWith(trackCountry)
      expect(homeDriver.containsCountry(country.Slug)).toBeTruthy()
    })
  })
})
