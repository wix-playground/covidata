import { jestHelpers } from 'react-test-renderer-utils'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
const { mockFull } = jestHelpers

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

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
