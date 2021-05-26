export default class TemplateDemoModule {
  prefix() {
    return 'template-demo-module';
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  __unsafe__initializeDemoModule() {
    const mockTools = require('wix-one-app-engine/lib/MockTools');
    const mockMode = mockTools.getLoginMode();

    switch (mockMode) {
      case 'quickLogin':
        mockTools.setLoginDataFromLocalConfigFile();
        break;
      case 'offline':
        // TODO
        break;
      default:
        console.warn('Unhandled mock Mode: ' + mockMode);
    }
  }
}
