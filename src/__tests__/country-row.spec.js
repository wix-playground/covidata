import { CountryRow } from '../components/country-row'
import { PushScreenDriver } from './util/push-screen-driver'

const lithuania = {
  name: 'Lithuania',
  slug: 'lithuania',
  countryCode: 'LT',
  totalConfirmed: 1,
  newConfirmed: 2,
  newDeaths: 3,
  totalDeaths: 4,
  newRecovered: 5,
  totalRecovered: 6
}

it('should open the associated country on click', () => {
  const driver = new CountryRowDriver(CountryRow)

  driver.tapCountry(lithuania)
  expect(driver.openedCountryScreen(lithuania)).toEqual(true)
})

class CountryRowDriver extends PushScreenDriver {
  constructor () {
    super(CountryRow)
  }

  openedCountryScreen (country) {
    return this.didPushScreenWithProps(
      'CountryDetailScreen',
      { country: country }
    )
  }

  tapCountry (country) {
    this.setProps({ country: country })
    this.getComponent().props.onPress()
  }
}
