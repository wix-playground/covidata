import {FEED, NEWS_FEED_SCREEN} from './strings';
import {NEWS_FEED_TAB_BUTTON} from './test-ids';

const {Navigation} = require('react-native-navigation');

export function setUpNavigation() {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions();
    setRoot();
  });
}

export function registerComponents() {
  const HomeScreen = require('./screens/home-screen/home-screen').default;
  const CountryListScreen =
    require('./screens/country-list-screen/country-list-screen').default;
  const CountryDetailScreen =
    require('./screens/country-detail-screen/country-detail-screen').default;
  const NewsFeedScreen =
    require('./screens/news-feed-screen/index').NewsFeedScreen;
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
  const {i18n} = require('../strings/index').i18n;
  const {HOME_SCREEN, COUNTRIES_SCREEN, HOME, COUNTRIES} = require('./strings');
  const {HOME_TAB_BUTTON, COUNTRIES_TAB_BUTTON} = require('./test-ids');
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
                  testID: HOME_TAB_BUTTON,
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
                  testID: COUNTRIES_TAB_BUTTON,
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
                  testID: NEWS_FEED_TAB_BUTTON,
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
