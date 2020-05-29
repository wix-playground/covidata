import { store } from '../redux/configure-store'
import { HomeScreenDriver } from './utils/home-screen-driver'

describe('Home screen', () => {
  it('should store, process and display global data on fetch', async () => {
    const driver = new HomeScreenDriver(store)
    await driver.renderAsync()

    expect(driver.containsText('🌍 Global')).toBeTruthy()
    expect(driver.containsText('4,977,471')).toBeTruthy()
    expect(driver.containsText('329,513')).toBeTruthy()
    expect(driver.containsText('1,838,344')).toBeTruthy()
  })
})
