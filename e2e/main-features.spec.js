import { CONFIRMED, DEATHS, GLOBAL, RECOVERIES } from '../src/strings'
import {
  TEST_ID_COUNTRY_NAME,
  TEST_ID_FLAT_LIST,
  TEST_ID_STAT_PREFIX_NAME_TOTAL
} from '../src/test-ids'
import { e2eDriver } from './utils/e2e-driver'

describe('Main features', () => {
  beforeEach(async () => {
    await e2eDriver.relaunchApp()
  })

  it('should fetch and display the global information from the server', async () => {
    const globalSlug = GLOBAL.toLowerCase()
    await

    expect(element(by.text(CONFIRMED))).toBeVisible()
    await expect(element(by.text(DEATHS))).toBeVisible()
    await expect(element(by.text(RECOVERIES))).toBeVisible()
    await expect(element(by.id(TEST_ID_COUNTRY_NAME(globalSlug)))).toHaveText('🌍 GLOBAL')
    await expect(element(by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, CONFIRMED)))).toHaveText('4,977,471')
    await expect(element(by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, DEATHS)))).toHaveText('329,513')
    await expect(element(by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, RECOVERIES)))).toHaveText('1,838,344')
  })

  it('should show countries screen after tapping the Countries tab, have Zimbabwe as the last element fetched', async () => {
    await e2eDriver.openCountriesTab()
    await

    expect(element(by.id(TEST_ID_FLAT_LIST))).toBeVisible()
    await element(by.id(TEST_ID_FLAT_LIST)).scrollTo('bottom')
    await

    expect(element(by.text('Zimbabwe'))).toBeVisible()
  })

  it('should open Country details screen on country selected', async () => {
    await e2eDriver.openCountriesTab()
    await e2eDriver.tapOnCountryInList('afghanistan')
    await

    expect(element(by.id(TEST_ID_COUNTRY_NAME('afghanistan')))).toHaveText('🇦🇫 AFGHANISTAN')
  })
})
