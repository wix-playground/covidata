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

    it('should be toggle tracking switch on press', async () => {
      const toggleSwitch = element(by.id('tracking_switch'));
      const initialValue = toggleSwitch.valueOf();
      await toggleSwitch.tap();
      await expect(toggleSwitch).toHaveValue(`${+!initialValue}`);
    });

  });



});