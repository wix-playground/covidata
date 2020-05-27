import { HomeScreen } from '../screens/home-screen'
import { waitForElement } from 'react-native-testing-library'

const { renderComponent, getTextNodes } = require('react-component-driver')

/*
  naming:
  `describe` should usually tell what is the unit we're testing, e.g. HomeScreen
  and `it` should tell what we expect that unit to do (display, do some action on press, etc.)

  describe('Home Screen'..
  it('should display global data'..
*/
describe('should behave correctly in the home screen', () => {
  it('should store, process and display global data on fetch', async () => {
    const comp = renderComponent(HomeScreen)
    await waitForElement(() =>

      expect(fetch).toHaveBeenCalledTimes(1))

    expect(getTextNodes(comp)).toContain('🌍 Global')
    expect(getTextNodes(comp)).toContain('4,977,471')
    expect(getTextNodes(comp)).toContain('329,513')
    expect(getTextNodes(comp)).toContain('1,838,344')
  })
})
