export default class CovidataModule {
  components() {
    const {Provider} = require('react-redux');
    const {asWixScreen} = require('@wix/wix-react-native-ui-lib');
    const {wrapWithProvider} = require('./utils/helper-methods');
    const {store} = require('./redux/configure-store');
    return [
      {
        id: 'covidata.HomeScreen',
        generator: () =>
          asWixScreen(() =>
            wrapWithProvider(
              require('./screens/home-screen').default,
              Provider,
              store,
            ),
          ),
        description: '',
      },
      {
        id: 'covidata.CountryListScreen',
        generator: () =>
          asWixScreen(() =>
            wrapWithProvider(
              require('./screens/country-list-screen').default,
              Provider,
              store,
            ),
          ),
        description: '',
      },
      {
        id: 'covidata.CountryDetailScreen',
        generator: () =>
          asWixScreen(() =>
            wrapWithProvider(
              require('./screens/country-detail-screen').default,
              Provider,
              store,
            ),
          ),
        description: '',
      },
      {
        id: 'covidata.NewsFeedScreen',
        generator: () =>
          asWixScreen(
            wrapWithProvider(
              require('./screens/news-feed-screen').default,
              Provider,
              store,
            ),
          ),
        description: '',
      },
      {
        id: 'covidata.Widget',
        generator: () => require('@wix/wix-react-native-ui-lib').View,
        description: '',
      },
    ];
  }

  consumedServices() {
    return {
      'wix.platform.dashboardWidgetsService': [
        {
          id: 'covidata.widget',
          displayName: 'Covidata',
          title: {text: 'Covidata Widget'},
          ctaArray: [
            {
              id: 'push_screen_example',
              title: 'Open',
              actionType: 'component',
              actionPayload: {
                transition: 'push',
                componentId: 'covidata.HomeScreen',
                passProps: {},
              },
            },
          ],
          componentId: 'covidata.Widget',
          startLoadingComponent(_) {
            return Promise.resolve();
          },
        },
      ],
    };
  }

  prefix() {
    return 'covidata';
  }
}
