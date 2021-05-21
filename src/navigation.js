const {Navigation} = require('react-native-navigation');

export function setUpNavigation() {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions();
    setRoot();
  });
}

export function registerComponents() {
  const HomeScreen = require('./screens/home-screen').default;
  const CountryListScreen = require('./screens/country-list-screen').default;
  const CountryDetailScreen =
    require('./screens/country-detail-screen').default;
  const NewsFeedScreen = require('./screens/news-feed-screen').default;
  const Provider = require('react-redux').Provider;
  const store = require('./redux/configure-store').store;
  const wrapWithProvider = require('./utils/helper-methods').wrapWithProvider;
  const {i18n} = require('../strings/index').i18n;
  Navigation.registerComponent(
    i18n('HOME_SCREEN'),
    () => (props) => wrapWithProvider(HomeScreen, Provider, store, props),
    () => HomeScreen,
  );
  Navigation.registerComponent(
    i18n('COUNTRIES_SCREEN'),
    () => (props) =>
      wrapWithProvider(CountryListScreen, Provider, store, props),
    () => CountryListScreen,
  );
  Navigation.registerComponent(
    i18n('COUNTRY_DETAIL_SCREEN'),
    () => (props) =>
      wrapWithProvider(CountryDetailScreen, Provider, store, props),
    () => CountryDetailScreen,
  );
  Navigation.registerComponent(
    i18n('NEWS_FEED_SCREEN'),
    () => (props) => wrapWithProvider(NewsFeedScreen, Provider, store, props),
  );
}

function setRoot() {
  const {i18n} = require('../strings/index').i18n;
  const {
    TEST_ID_HOME_TAB_BUTTON,
    TEST_ID_COUNTRIES_TAB_BUTTON,
    TEST_ID_NEWS_FEED_TAB_BUTTON,
  } = require('./test-ids');
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: i18n('HOME_SCREEN'),
                    options: {
                      topBar: {
                        title: {
                          text: i18n('HOME'),
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_HOME_TAB_BUTTON,
                  text: i18n('HOME'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: i18n('COUNTRIES_SCREEN'),
                    options: {
                      topBar: {
                        title: {
                          text: i18n('COUNTRIES'),
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_COUNTRIES_TAB_BUTTON,
                  text: i18n('COUNTRIES'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: i18n('NEWS_FEED_SCREEN'),
                    options: {
                      topBar: {
                        title: {
                          text: i18n('FEED'),
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_NEWS_FEED_TAB_BUTTON,
                  text: i18n('FEED'),
                },
              },
            },
          },
        ],
      },
    },
  });
}

function setDefaultNavigationOptions() {
  Navigation.setDefaultOptions({
    bottomTab: {
      fontSize: 14,
      selectedTextColor: '#147EFB',
      fontWeight: 'bold',
    },
  });
}

export const pushScreen = (componentId, name, passProps) => {
  Navigation.push(componentId, {
    component: {
      name,
      passProps,
    },
  });
};
