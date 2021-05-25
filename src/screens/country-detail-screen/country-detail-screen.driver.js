import {ReduxComponentDriver} from 'redux-component-driver';
import CountryDetailScreen from './country-detail-screen';
import {TRACKING_SWITCH} from '../../test-ids';
import {setCountryTracked} from '../../redux/actions';
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;

export class CountryDetailScreenDriver extends ReduxComponentDriver {
  constructor(store, props) {
    super(CountryDetailScreen, store);
    this.setProps(props);
    this.store = store;
  }

  tapSwitch() {
    const oldValue = this.getSwitchValue();
    this.getByID(TRACKING_SWITCH).props.onValueChange(!oldValue);
    return this;
  }

  dispatchCountryTrackedState(countrySlug, value) {
    act(() => {
      this.store.dispatch(setCountryTracked(countrySlug, value));
    });
  }

  getSwitchValue() {
    return this.getByID(TRACKING_SWITCH).props.value;
  }

  getTrackedCountries() {
    return this.store.getState().tracked;
  }

  countryIsTracked(countrySlug) {
    return this.getTrackedCountries().includes(countrySlug);
  }
}
