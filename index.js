import {CountryDetailScreen} from './src/screens/CountryDetailScreen';
import React from 'react';
import CountryListScreen from './src/screens/CountryListScreen';
import {HomeScreen} from './src/screens/HomeScreen';
const {Navigation} = require('react-native-navigation');

// separation of concerns. this is the entry point of the app, it would be a good
// idea to use launcher function, which would handle screen registration and
// setting current screen separately. Having descriptive helper functions would
// help a lot too. Instead of having this verbose bootstrap, you could have
// something like: registerScreens(), initializeFirstScreen() (naming could
// be even further improved I believe :)

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('CountriesScreen', () => CountryListScreen);
Navigation.registerComponent('CountryDetailScreen', () => CountryDetailScreen)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: 'white',
      style: 'dark'
    },
    bottomTab: {
      fontSize: 14,
      selectedFontSize: 14,
    },
  });
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
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "home_tab_button"
                }
              }
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'CountriesScreen',
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "countries_tab_button"
                }
              }
            },
          },
        ],
      },
    },
  });
});