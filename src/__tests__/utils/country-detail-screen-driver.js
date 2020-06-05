import { ReduxComponentDriver } from 'redux-component-driver'
import CountryDetailScreen from '../../screens/country-detail-screen'
import { TEST_ID_TRACKING_SWITCH } from '../../test-ids'
import { ACTIONS } from '../../redux/actions'
import TestRenderer from 'react-test-renderer'
const { act } = TestRenderer

export class CountryDetailScreenDriver extends ReduxComponentDriver {
  constructor (store, props) {
    super(CountryDetailScreen, store)
    this.setProps(props)
    this.store = store
  }

  tapSwitch () {
    const oldValue = this.getSwitchValue()
    this.getByID(TEST_ID_TRACKING_SWITCH).props.onValueChange(!oldValue)
    return this
  }

  dispatchCountryTrackedState (countrySlug, value) {
    act(() => {
      this.store.dispatch(this.createTrackingDispatchArgument(countrySlug, value))
    })
  }

  /* this is not needed as you can reuse setCountryTrackedAction */
  createTrackingDispatchArgument (countrySlug, value) {
    return { type: ACTIONS.SET_COUNTRY_TRACKED, payload: { countrySlug, value: value } }
  }

  getSwitchValue () {
    return this.getByID(TEST_ID_TRACKING_SWITCH).props.value
  }

  getTrackedCountries () {
    return this.store.getState().tracked
  }

  countryIsTracked (countrySlug) {
    return this.getTrackedCountries().includes(countrySlug)
  }
}
