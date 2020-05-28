import {Provider} from 'react-redux';
import React from 'react';
import {store} from '../redux/reducers';

const { Navigation } = require('react-native-navigation')

export function setUpNavigation () {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions()
    await setRoot()
  })
}

export function registerComponents () {
  const HomeScreen = require('./home-screen').default
  const CountryListScreen = require('./country-list-screen').default
  const CountryDetailScreen = require('./country-detail-screen').default
  Navigation.registerComponent('Home', () => (props) => (
    <Provider store={store}>
      <HomeScreen {...props} />
    </Provider>
  ), () => HomeScreen)
  Navigation.registerComponent('CountriesScreen', () => (props) => (
    <Provider store={store}>
      <CountryListScreen {...props} />
    </Provider>
  ), () => CountryListScreen)
  Navigation.registerComponent('CountryDetailScreen', () => (props) => (
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
                    name: 'Home',
                    options: {
                      topBar: {
                        title: {
                          text: 'Home'
                        }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: 'home_tab_button',
                  text: 'Home'
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'CountriesScreen',
                    options: {
                      topBar: {
                        title: {
                          text: 'Countries'
                        }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: 'countries_tab_button',
                  text: 'Countries'
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
