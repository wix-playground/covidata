import {CountryDetailScreen} from './src/screens/CountryDetailScreen';
import React from 'react';
import CountryListScreen from './src/screens/CountryListScreen';
import {HomeScreen} from './src/screens/HomeScreen';
const {Navigation} = require('react-native-navigation');

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