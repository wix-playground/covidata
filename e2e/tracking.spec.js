import {
  TEST_ID_COUNTRIES_TAB_BUTTON,
  TEST_ID_COUNTRY_NAME,
  TEST_ID_HOME_TAB_BUTTON,
  TEST_ID_TRACKING_SWITCH
} from '../src/test-ids'

describe('Tracking functionality', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
  })

  describe('home screen', () => {
    it('should show the tracked country on the home screen', async () => {
      await element(by.id(TEST_ID_COUNTRIES_TAB_BUTTON)).tap()
      await element(by.id('afghanistan')).tap()
      const toggleSwitch = element(by.id(TEST_ID_TRACKING_SWITCH))
      await toggleSwitch.tap()
      await element(by.id(TEST_ID_HOME_TAB_BUTTON)).tap()
      await

      expect(element(by.id(TEST_ID_COUNTRY_NAME('afghanistan')))).toBeVisible()
    })
  })
})
