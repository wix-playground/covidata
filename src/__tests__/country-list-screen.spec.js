import { CountryListScreen } from '../screens/country-list-screen'
import { filterByTestID, getTextNodes, renderComponent } from 'react-component-driver'
import { CountryListScreenDriver } from './utils/country-list-screen-driver'
import { extractCountries } from '../api/fetch-summary'

const countries = extractCountries(require('../../fake-server/data/summary.json')).countries

describe('should behave correctly in the country list screen', () => {
  it('should create a list of countries on fetch', async () => {
    const comp = renderComponent(CountryListScreen, { countries })

    const countries10 = filterByTestID(/.*_row/, comp)

    expect(countries10.length).toEqual(10) // 10 initial renders
    expect(getTextNodes(countries10[0])).toContain('🇦🇫')
    expect(getTextNodes(countries10[0])).toContain('Afghanistan')
    expect(getTextNodes(countries10[0])).toContain('7,653')
  })

  it('should open the country detail page on flat list item press', async () => {
    const countries = extractCountries(require('../../fake-server/data/summary.json')).countries
    const driver = new CountryListScreenDriver()
    driver.setProps({ countries })
    await driver.renderAsync()

    const countrySlug = 'afghanistan'

    const countryData = driver.getCountryData(countrySlug)
    driver.tapCountry(countrySlug)

    expect(driver.openedCountryScreenWith(countryData)).toBeTruthy()
  })
})
