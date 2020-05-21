describe('Tracking functionality', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('inner country page', () => {

    beforeEach(async () => {
      await element(by.id('countries_tab_button')).tap();
      await element(by.id('afghanistan')).tap();
    });

    it('should have a switch visible', async () => {
      const toggleSwitch = element(by.id('tracking_switch'));
      await expect(toggleSwitch).toBeVisible();
    });

    it('should toggle tracking switch on press', async () => {
      const toggleSwitch = element(by.id('tracking_switch'));
      await expect(toggleSwitch).toHaveValue('0');
      await toggleSwitch.tap();
      await expect(toggleSwitch).toHaveValue('1');
    });

  });

  describe('home screen', () => {

    it('should show the tracked country on the home screen', async () => {
      await element(by.id('countries_tab_button')).tap();
      await element(by.id('afghanistan')).tap();
      const toggleSwitch = element(by.id('tracking_switch'));
      await toggleSwitch.tap();
      await element(by.id('home_tab_button')).tap();
      await expect(element.by.id('country_name_afghanistan')).toBeVisible();
    });

  });



});