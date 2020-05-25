const { Navigation } = require('react-native-navigation')

export function setUpNavigation () {
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultNavigationOptions()
    await setRoot()
  })
}

export function registerComponents () {
  Navigation.registerComponent('Home', () => require('./screens/home-screen').HomeScreen)
  Navigation.registerComponent('CountriesScreen', () => require('./screens/country-list-screen').CountryListScreen)
  Navigation.registerComponent('CountryDetailScreen', () => require('./screens/country-detail-screen').CountryDetailScreen)
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
