import { ComponentDriver } from 'react-component-driver'
import { CountryListScreen } from '../../screens/country-list-screen'
import { Navigation } from 'react-native-navigation'
import {TEST_ID_COUNTRY_ROW, TEST_ID_FLAT_LIST} from '../../test-ids';
import {COUNTRY_DETAIL_SCREEN} from '../../strings';
const { _ } = require('lodash')

export class CountryListScreenDriver extends ComponentDriver {
  constructor () {
    super(CountryListScreen)
  }

  getCountryData (countrySlug) {
    const allCountryData = this.getListData()
    return allCountryData.filter((node) => node.Slug === countrySlug)[0]
  }

  getListData () {
    return this.getByID(TEST_ID_FLAT_LIST).props.data
  }

  didPushScreenWithProps (screenName, props) {
    const pushedScreen = Navigation.push.mock.calls.pop()[1].component
    return pushedScreen.name === screenName &&
      _.isEqual(pushedScreen.passProps, props)
  }

  openedCountryScreenWith (countryObj) {
    return this.didPushScreenWithProps(
      COUNTRY_DETAIL_SCREEN,
      { country: countryObj }
    )
  }

  tapCountry (countrySlug) {
    this.getByID(TEST_ID_COUNTRY_ROW(countrySlug)).props.onPress()
    return this
  }
}
