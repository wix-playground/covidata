import { Provider } from 'react-redux'
import React from 'react'
import { store } from './redux/configure-store'
import { TEST_ID_COUNTRIES_TAB_BUTTON, TEST_ID_HOME_TAB_BUTTON } from './test-ids'
import { COUNTRIES, COUNTRIES_SCREEN, COUNTRY_DETAIL_SCREEN, HOME, HOME_SCREEN } from './strings'

const { Navigation } = require('react-native-navigation')

export function setUpNavigation () {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions()
    await setRoot()
  })
}

export function registerComponents () {
  const HomeScreen = require('./screens/home-screen').default
  const CountryListScreen = require('./screens/country-list-screen').default
  const CountryDetailScreen = require('./screens/country-detail-screen').default
  Navigation.registerComponent(HOME_SCREEN, () => (props) => (
    <Provider store={store}>
      <HomeScreen {...props} />
    </Provider>
  ), () => HomeScreen)
  Navigation.registerComponent(COUNTRIES_SCREEN, () => (props) => (
    <Provider store={store}>
      <CountryListScreen {...props} />
    </Provider>
  ), () => CountryListScreen)
  Navigation.registerComponent(COUNTRY_DETAIL_SCREEN, () => (props) => (
    <Provider store={store}>
      <CountryDetailScreen {...props} />
    </Provider>
  ), () => CountryDetailScreen)
}

function setRoot () {
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
                          text: HOME
                        }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_HOME_TAB_BUTTON,
                  text: HOME
                }
              }
            }
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
                          text: COUNTRIES
                        }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: TEST_ID_COUNTRIES_TAB_BUTTON,
                  text: COUNTRIES
                }
              }
            }
          }
        ]
      }
    }
  })
}

function setDefaultNavigationOptions () {
  Navigation.setDefaultOptions({
    bottomTab: {
      fontSize: 14,
      selectedTextColor: '#147EFB',
      fontWeight: 'bold'
    }
  })
}
