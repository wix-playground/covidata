import { e2eDriver } from './utils/e2e-driver'

describe('Tracking functionality', () => {
  beforeEach(async () => {
    await e2eDriver.relaunchApp()
  })

  const countrySlug = 'afghanistan'

  it('should show the tracked country on the home screen', async () => {
    await e2eDriver.openCountriesTab()
    await e2eDriver.tapOnCountryInList(countrySlug)
    await e2eDriver.toggleSwitch()
    await e2eDriver.openHomeTab()
    await e2eDriver.expectCountryCardToBeVisible(countrySlug)
  })

  it('should save the tracked list of items with app relaunch (persistence)', async () => {
    await e2eDriver.openCountriesTab()
    await e2eDriver.tapOnCountryInList(countrySlug)
    await e2eDriver.toggleSwitch()
    await e2eDriver.openHomeTab()
    await e2eDriver.expectCountryCardToBeVisible(countrySlug)
    await e2eDriver.relaunchApp()
    await e2eDriver.expectCountryCardToBeVisible(countrySlug)
  })
})
