import { CountryDetailScreen } from './src/screens/country-detail-screen'
import { CountryListScreen } from './src/screens/country-list-screen'
import { HomeScreen } from './src/screens/home-screen'
const { Navigation } = require('react-native-navigation')

Navigation.registerComponent('Home', () => HomeScreen)
Navigation.registerComponent('CountriesScreen', () => CountryListScreen)
Navigation.registerComponent('CountryDetailScreen', () => CountryDetailScreen)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: 'white',
      style: 'dark'
    },
    bottomTab: {
      fontSize: 14,
      selectedFontSize: 14
    }
  })
  await Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home'
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: 'home_tab_button'
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'CountriesScreen'
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: 'countries_tab_button'
                }
              }
            }
          }
        ]
      }
    }
  })
})
