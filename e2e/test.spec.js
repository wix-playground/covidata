describe('Example', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display placeholder strings on launch', async () => {
    await expect(element(by.text('Confirmed'))).toBeVisible();
    await expect(element(by.text('Deaths'))).toBeVisible();
    await expect(element(by.text('Recoveries'))).toBeVisible();
  });

  it('should fetch the global information from the server', async () => {
    await expect(element(by.id('country_name_global'))).toHaveText("🌍 GLOBAL");
    await expect(element(by.id('global_Confirmed_total'))).toHaveText("4,977,471");
    await expect(element(by.id('global_Deaths_total'))).toHaveText("329,513");
    await expect(element(by.id('global_Recoveries_total'))).toHaveText("1,838,344");
    // await expect(element(by.id('global_Confirmed_new'))).toHaveLabel("+96840");
    // await expect(element(by.id('global_Deaths_new'))).toHaveLabel("+5089");
    // await expect(element(by.id('global_Recoveries_new'))).toHaveLabel("+52120");
  });

  it('should show countries screen after tapping the Countries tab', async () => {
    await element(by.id('countries_tab_button')).tap();
    await expect(element(by.id('flat_list'))).toBeVisible();
  });

  it('should open home after tapping Home on the bottom tab interface', async () => {
    await element(by.id('countries_tab_button')).tap();
    await element(by.id('home_tab_button')).tap();
    await expect(element(by.text('Confirmed'))).toBeVisible();
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
