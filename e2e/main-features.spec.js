describe('Main features', () => {

  beforeEach(async () => {
    await device.launchApp();
  });

  it('should fetch and display the global information from the server', async () => {
    await expect(element(by.text('Confirmed'))).toBeVisible();
    await expect(element(by.text('Deaths'))).toBeVisible();
    await expect(element(by.text('Recoveries'))).toBeVisible();
    await expect(element(by.id('country_name_global'))).toHaveText("🌍 GLOBAL");
    await expect(element(by.id('global_Confirmed_total'))).toHaveText("4,977,471");
    await expect(element(by.id('global_Deaths_total'))).toHaveText("329,513");
    await expect(element(by.id('global_Recoveries_total'))).toHaveText("1,838,344");
  });

  it('should show countries screen after tapping the Countries tab, have Zimbabwe as the last element fetched', async () => {
    await element(by.id('countries_tab_button')).tap();
    await expect(element(by.id('flat_list'))).toBeVisible();
    await element(by.id('flat_list')).scrollTo('bottom');
    await expect(element(by.text('Zimbabwe'))).toBeVisible();
  });

  it('should open Country details screen on country selected', async () => {
    await element(by.id('countries_tab_button')).tap();
    await element(by.id('afghanistan')).tap();
  });

});
