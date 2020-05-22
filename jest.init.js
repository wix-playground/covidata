jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.StatusBarManager.getHeight = jest.fn();
  reactNative.AccessibilityInfo.isScreenReaderEnabled = jest
    .fn()
    .mockResolvedValue(false);
  return reactNative;
});