import {CONFIRMED, DEATHS, GLOBAL, RECOVERIES} from '../src/strings';
import {
  GET_COUNTRY_NAME,
  FLAT_COUNTRY_LIST,
  GET_STAT_PREFIX_NAME_TOTAL,
} from '../src/test-ids';
import {E2EDriver} from './utils/e2e-driver';
import {i18n} from '../strings';

describe('Main features', () => {
  beforeEach(async () => {
    await E2EDriver.relaunchApp();
  });

  it('should fetch and display the global information from the server', async () => {
    const globalSlug = i18n('GLOBAL').toLowerCase();
    await expect(element(by.text(i18n('CONFIRMED')))).toBeVisible();
    await expect(element(by.text(i18n('DEATHS')))).toBeVisible();
    await expect(element(by.text(i18n('RECOVERIES')))).toBeVisible();
    await expect(element(by.id(TEST_ID_COUNTRY_NAME(globalSlug)))).toHaveText(
      '🌍 GLOBAL',
    );
    await expect(
      element(
        by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, i18n('CONFIRMED'))),
      ),
    ).toHaveText('4,977,471');
    await expect(
      element(
        by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, i18n('DEATHS'))),
      ),
    ).toHaveText('329,513');
    await expect(
      element(
        by.id(TEST_ID_STAT_PREFIX_NAME_TOTAL(globalSlug, i18n('RECOVERIES'))),
      ),
    ).toHaveText('1,838,344');
  });

  it('should show countries screen after tapping the Countries tab, have Zimbabwe as the last element fetched', async () => {
    await E2EDriver.openCountriesTab();
    await expect(element(by.id(TEST_ID_FLAT_COUNTRY_LIST))).toBeVisible();
    await element(by.id(TEST_ID_FLAT_COUNTRY_LIST)).scrollTo('bottom');
    await expect(element(by.text('Zimbabwe'))).toBeVisible();
  });

  it('should open Country details screen on country selected', async () => {
    await E2EDriver.openCountriesTab();
    await E2EDriver.tapOnCountryInList('afghanistan');
    await expect(
      element(by.id(TEST_ID_COUNTRY_NAME('afghanistan'))),
    ).toHaveText('🇦🇫 AFGHANISTAN');
  });
});
