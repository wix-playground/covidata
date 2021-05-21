import {FEED, NEWS_FEED_SCREEN} from './strings';
import {TEST_ID_NEWS_FEED_TAB_BUTTON} from './test-ids';

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
  const {
    HOME_SCREEN,
    COUNTRIES_SCREEN,
    COUNTRY_DETAIL_SCREEN,
    NEWS_FEED_SCREEN,
  } = require('./strings');
  Navigation.registerComponent(
    HOME_SCREEN,
    () => (props) => wrapWithProvider(HomeScreen, Provider, store, props),
    () => HomeScreen,
  );
  Navigation.registerComponent(
    COUNTRIES_SCREEN,
    () => (props) =>
      wrapWithProvider(CountryListScreen, Provider, store, props),
    () => CountryListScreen,
  );
  Navigation.registerComponent(
    COUNTRY_DETAIL_SCREEN,
    () => (props) =>
      wrapWithProvider(CountryDetailScreen, Provider, store, props),
    () => CountryDetailScreen,
  );
  Navigation.registerComponent(
    NEWS_FEED_SCREEN,
    () => (props) => wrapWithProvider(NewsFeedScreen, Provider, store, props),
  );
}

function setRoot() {
  const {HOME_SCREEN, COUNTRIES_SCREEN, HOME, COUNTRIES} = require('./strings');
  const {
    TEST_ID_HOME_TAB_BUTTON,
    TEST_ID_COUNTRIES_TAB_BUTTON,
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
                    name: HOME_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: HOME,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_HOME_TAB_BUTTON,
                  text: HOME,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: COUNTRIES_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: COUNTRIES,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_COUNTRIES_TAB_BUTTON,
                  text: COUNTRIES,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: NEWS_FEED_SCREEN,
                    options: {
                      topBar: {
                        title: {
                          text: FEED,
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_NEWS_FEED_TAB_BUTTON,
                  text: FEED,
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
