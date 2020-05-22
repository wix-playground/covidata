import {CountryDetailScreen} from './src/screens/CountryDetailScreen';
import React from 'react';
/*
 try to avoid default exports as it gives room for inconsistent naming
 e.g. file A: import CountryListScreen from './CountryListScreen'; file B: import CountryList from './CountryListScreen';
*/
import CountryListScreen from './src/screens/CountryListScreen';
import {HomeScreen} from './src/screens/HomeScreen';
const {Navigation} = require('react-native-navigation');

/*
 your app will import screens during the launch time, which may increase the loading time
 (though in small apps it won't be that noticeable)
 it's better to lazy require the dependencies

 e.g.:
 const launch = () => {
  Navigation.registerComponent('Home', () => require('./src/screens/HomeScreen').HomeScreen);
  ...

  Navigation.events().registerAppLaunchedListener...
 };

 launch();
*/

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