import { jestHelpers } from 'react-test-renderer-utils'
const { mockFull } = jestHelpers

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native')
  reactNative.NativeModules.StatusBarManager.getHeight = jest.fn()
  reactNative.AccessibilityInfo.isScreenReaderEnabled = jest
    .fn()
    .mockResolvedValue(false)
  return reactNative
})

jest.mock('react-native-ui-lib', () =>
  mockFull(['Badge', 'Text', 'View', 'Card', 'ListItem', 'LoaderScreen', 'Switch']))

jest.mock('react-native-navigation', () => {
  return { Navigation: { push: jest.fn() } }
})

fetch = jest.fn().mockResolvedValue({
  json: () => {
    return (require('./fake-server/data/summary.json'))
  }
})
