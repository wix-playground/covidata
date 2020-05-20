describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display placeholder strings on launch', async () => {
    await expect(element(by.text('Confirmed'))).toBeVisible();
    await expect(element(by.text('Deaths'))).toBeVisible();
    await expect(element(by.text('Recoveries'))).toBeVisible();
  });

  it('should show countries screen after tapping the Countries tab', async () => {
    await element(by.id('countries_tab_button')).tap();
    await expect(element(by.id('flat_list'))).toBeVisible();
  });

  it('should have Zimbabwe as the last element fetched in Countries tab', async () => {
    await element(by.id('countries_tab_button')).tap();
    await expect(element(by.id('flat_list'))).toBeVisible();
    await element(by.id('flat_list')).scrollTo('bottom');
    await expect(element(by.text('Zimbabwe'))).toBeVisible();
  });

  it('should open Country screen on country selected', async () => {
    await element(by.id('countries_tab_button')).tap();
    await element(by.id('afghanistan')).tap();
  });

});
