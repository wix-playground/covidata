import { waitForElement } from 'react-native-testing-library'
import { CountryListScreen } from '../screens/country-list-screen'
import { filterByTestID, getTextNodes, renderComponent } from 'react-component-driver'
import { CountryListScreenDriver } from '../utils/country-list-screen-driver'

describe('should behave correctly in the country list screen', () => {
  it('should create a list of countries on fetch', async () => {
    const comp = renderComponent(CountryListScreen)
    await waitForElement(() =>

      expect(fetch).toHaveBeenCalledTimes(1))

    const countries10 = filterByTestID(/.*_row/, comp)

    expect(countries10.length).toEqual(10) // 10 initial renders
    expect(getTextNodes(countries10[0])).toContain('🇦🇫')
    expect(getTextNodes(countries10[0])).toContain('Afghanistan')
    expect(getTextNodes(countries10[0])).toContain('7,653')
  })

  it('should open the country detail page on flat list item press', async () => {
    const driver = new CountryListScreenDriver()
    await driver.renderAsync()

    const countrySlug = 'afghanistan'
    const allCountryData = driver.getByID('flat_list').props.data
    const countryData = allCountryData.filter((node) => node.slug === countrySlug)[0]

    driver.tapCountry(countrySlug)

    expect(driver.openedCountryScreenWith(countryData)).toBeTruthy()
  })
})
