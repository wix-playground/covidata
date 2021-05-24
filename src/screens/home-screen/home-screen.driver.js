import {ReduxComponentDriver, getTextNodes} from 'redux-component-driver';
import HomeScreen from './home-screen';
import {HOME_TRACKED_LIST} from '../../test-ids';

export class HomeScreenDriver extends ReduxComponentDriver {
  constructor(store) {
    super(HomeScreen, store);
  }

  containsText(text) {
    return getTextNodes(this.getComponent()).includes(text);
  }

  getTrackedCountryList() {
    return this.filterByID(HOME_TRACKED_LIST)[0].props.data || null;
  }

  containsTrackedCountryList() {
    return this.getTrackedCountryList() || false;
  }

  containsCountry(countrySlug) {
    return (
      this.getTrackedCountryList().filter(
        (node) => node.Slug === countrySlug,
      )[0] || false
    );
  }
}
