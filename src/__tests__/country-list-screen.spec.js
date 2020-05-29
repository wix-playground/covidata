import { CountryListScreenDriver } from './utils/country-list-screen-driver'
import { extractCountries } from '../api/fetch-summary'

const countries = extractCountries(require('../../fake-server/data/summary.json')).countries

describe('Country list screen', () => {
  let driver

  beforeEach(async () => {
    driver = new CountryListScreenDriver()
    driver.setProps({ countries })
    await driver.renderAsync()
  })

  it('should create a list of countries on fetch', async () => {
    const countrySlug = 'afghanistan'

    const countries = driver.getRenderedCountries()

    expect(countries.length).toEqual(10) // 10 initial renders

    expect(driver.containsCountry(countries, countrySlug)).toBeTruthy()
    expect(driver.containsText(countries, '🇦🇫')).toBeTruthy()
    expect(driver.containsText(countries, 'Afghanistan')).toBeTruthy()
    expect(driver.containsText(countries, '7,653')).toBeTruthy()
  })

  it('should open the country detail page on flat list item press', async () => {
    const countrySlug = 'afghanistan'

    const countryData = driver.getCountryData(countrySlug)
    driver.tapCountry(countrySlug)

    expect(driver.openedCountryScreenWith(countryData)).toBeTruthy()
  })
})
