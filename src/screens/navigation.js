const { Navigation } = require('react-native-navigation')

export function setUpNavigation () {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions()
    /* await in this case does nothing as you need to return from setRoot or have await before Navigation.setRoot */
    await setRoot()
  })
}

export function registerComponents () {
  Navigation.registerComponent('Home', () => require('./home-screen').HomeScreen)
  Navigation.registerComponent('CountriesScreen', () => require('./country-list-screen').CountryListScreen)
  Navigation.registerComponent('CountryDetailScreen', () => require('./country-detail-screen').CountryDetailScreen)
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
