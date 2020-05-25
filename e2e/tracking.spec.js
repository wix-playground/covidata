describe('Tracking functionality', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
  })

  describe('home screen', () => {
    it('should show the tracked country on the home screen', async () => {
      await element(by.id('countries_tab_button')).tap()
      await element(by.id('afghanistan')).tap()
      const toggleSwitch = element(by.id('tracking_switch'))
      await toggleSwitch.tap()
      await element(by.id('home_tab_button')).tap()
      await expect(element.by.id('country_name_afghanistan')).toBeVisible()
    })
  })
})
