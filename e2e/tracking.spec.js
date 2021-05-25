import {E2EDriver} from './utils/e2e-driver';

describe('Tracking functionality', () => {
  beforeEach(async () => {
    await device.uninstallApp();
    await device.installApp();
    await E2EDriver.relaunchApp();
  });

  const countrySlug = 'afghanistan';

  it('should show the tracked country on the home screen', async () => {
    await E2EDriver.openCountriesTab();
    await E2EDriver.tapOnCountryInList(countrySlug);
    await E2EDriver.toggleSwitch();
    await E2EDriver.openHomeTab();
    await E2EDriver.expectCountryCardToBeVisible(countrySlug);
  });

  it('should save the tracked list of items with app relaunch (persistence)', async () => {
    await E2EDriver.openCountriesTab();
    await E2EDriver.tapOnCountryInList(countrySlug);
    await E2EDriver.toggleSwitch();
    await E2EDriver.openHomeTab();
    await E2EDriver.expectCountryCardToBeVisible(countrySlug);
    await E2EDriver.relaunchApp();
    await E2EDriver.expectCountryCardToBeVisible(countrySlug);
  });
});
