import { ComponentDriver } from 'react-component-driver'
import { CountryListScreen } from '../../screens/country-list-screen'
import { Navigation } from 'react-native-navigation'
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
    return this.getByID('flat_list').props.data
  }

  didPushScreenWithProps (screenName, props) {
    const pushedScreen = Navigation.push.mock.calls.pop()[1].component
    return pushedScreen.name === screenName &&
      _.isEqual(pushedScreen.passProps, props)
  }

  openedCountryScreenWith (countryObj) {
    return this.didPushScreenWithProps(
      'CountryDetailScreen',
      { country: countryObj }
    )
  }

  tapCountry (countrySlug) {
    this.getByID(`${countrySlug}_row`).props.onPress()
    return this
  }
}
