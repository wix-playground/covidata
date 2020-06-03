import { CountryListScreenDriver } from './utils/country-list-screen-driver'
import covidApi from '../api/covid-api'

const countries = [{
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
}, {
  Country: 'Afghanistan',
  CountryCode: 'AF',
  Slug: 'afghanistan',
  NewConfirmed: 581,
  TotalConfirmed: 7653,
  NewDeaths: 5,
  TotalDeaths: 178,
  NewRecovered: 49,
  TotalRecovered: 850,
  Date: '2020-05-20T09:10:49Z'
}]

covidApi.getSummary = jest.fn().mockResolvedValue({ globalData: {}, countries })

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

    // test fixture length must be under 10, otherwise full render might not happen
    expect(countries.length).toEqual(countries.length)

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
