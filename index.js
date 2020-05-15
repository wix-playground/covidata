import {CountryDetailScreen} from './src/screens/CountryDetailScreen';
import React from 'react';
import {Badge, Text, View} from 'react-native-ui-lib';
import CountriesScreen from './src/screens/CountryListScreen';
import {HomeScreen} from './src/screens/HomeScreen';
const {Navigation} = require('react-native-navigation');

export let API_ROOT = 'https://api.covid19api.com';

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('CountriesScreen', () => CountriesScreen);
Navigation.registerComponent('CountryDetailScreen', () => CountryDetailScreen)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: 'black',
      style: 'light'
    },
    topBar: {
      title: {
        color: 'white',
      },
      backButton: {
        color: 'white',
      },
      background: {
        color: 'black',
      },
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
            },
          },
        ],
      },
    },
  });
});