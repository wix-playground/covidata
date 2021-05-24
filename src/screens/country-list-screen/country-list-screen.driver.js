import {ComponentDriver, getTextNodes} from 'react-component-driver';
import {CountryListScreen} from './country-list-screen';
import {Navigation} from 'react-native-navigation';
import {GET_COUNTRY_ROW, FLAT_COUNTRY_LIST} from '../../test-ids';
import {COUNTRY_DETAIL_SCREEN} from '../../strings';
const {_} = require('lodash');

export class CountryListScreenDriver extends ComponentDriver {
  constructor() {
    super(CountryListScreen);
  }

  getCountryData(countrySlug) {
    const allCountryData = this.getListData();
    return allCountryData.filter((node) => node.Slug === countrySlug)[0];
  }

  getListData() {
    return this.getByID(FLAT_COUNTRY_LIST).props.data;
  }

  didPushScreenWithProps(screenName, props) {
    const pushedScreen = Navigation.push.mock.calls.pop()[1].component;
    return (
      pushedScreen.name === screenName &&
      _.isEqual(pushedScreen.passProps, props)
    );
  }

  openedCountryScreenWith(countryObj) {
    return this.didPushScreenWithProps(COUNTRY_DETAIL_SCREEN, {
      country: countryObj,
    });
  }

  getRenderedCountries() {
    return this.filterByID(/.*_row/);
  }

  containsCountry(countries, countrySlug) {
    return this.filterByID(`${countrySlug}_row`).length;
  }

  containsText(countries, text) {
    return getTextNodes(countries).includes(text);
  }

  tapCountry(countrySlug) {
    this.getByID(GET_COUNTRY_ROW(countrySlug)).props.onPress();
    return this;
  }
}
