import {
  COUNTRIES_TAB_BUTTON,
  GET_COUNTRY_NAME,
  HOME_TAB_BUTTON,
  TRACKING_SWITCH,
} from '../../src/test-ids';

export class E2EDriver {
  static openCountriesTab = async () => {
    await element(by.id(COUNTRIES_TAB_BUTTON)).tap();
  };

  static tapOnCountryInList = async (countrySlug) => {
    await element(by.id(countrySlug)).tap();
  };

  static openHomeTab = async () => {
    await element(by.id(HOME_TAB_BUTTON)).tap();
  };

  static toggleSwitch = async () => {
    await element(by.id(TRACKING_SWITCH)).tap();
  };

  static expectCountryCardToBeVisible = async (countrySlug) => {
    await expect(element(by.id(GET_COUNTRY_NAME(countrySlug)))).toBeVisible();
  };

  static relaunchApp = async () => {
    await device.launchApp({newInstance: true});
  };
}
