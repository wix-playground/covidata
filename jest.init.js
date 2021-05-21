import {jestHelpers} from 'react-test-renderer-utils';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
const {mockFull} = jestHelpers;

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.StatusBarManager.getHeight = jest.fn();
  reactNative.AccessibilityInfo.isScreenReaderEnabled = jest
    .fn()
    .mockResolvedValue(false);
  return reactNative;
});

jest.mock('@wix/wix-react-native-ui-lib', () =>
  mockFull([
    'Badge',
    'Text',
    'View',
    'Card',
    'ListItem',
    'LoaderScreen',
    'Switch',
    'ListItem',
    'AnimatedImage',
    'Assets',
  ]),
);

jest.mock('react-native-navigation', () => {
  return {Navigation: {push: jest.fn()}};
});
