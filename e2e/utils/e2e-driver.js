import {
  TEST_ID_COUNTRIES_TAB_BUTTON,
  TEST_ID_COUNTRY_NAME,
  TEST_ID_HOME_TAB_BUTTON,
  TEST_ID_TRACKING_SWITCH,
} from '../../src/test-ids';

export class e2eDriver {
  static openCountriesTab = async () => {
    await element(by.id(TEST_ID_COUNTRIES_TAB_BUTTON)).tap()
  }

  static tapOnCountryInList = async (countrySlug) => {
    await element(by.id(countrySlug)).tap()
  }

  static openHomeTab = async () => {
    await element(by.id(TEST_ID_HOME_TAB_BUTTON)).tap()
  }

  static toggleSwitch = async () => {
    await element(by.id(TEST_ID_TRACKING_SWITCH)).tap()
  }

  static expectCountryCardToBeVisible = async (countrySlug) => {
    await expect(element(by.id(TEST_ID_COUNTRY_NAME(countrySlug)))).toBeVisible()
  }

  static relaunchApp = async () => {
    await device.launchApp({ newInstance: true })
  }

  static expectElementIdToHaveText = async (elementId, text) => {
    await expect(element(by.id(elementId))).toHaveText(text)
  }
}