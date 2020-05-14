import {CountryDetailScreen} from './CountryDetail';

const {Navigation} = require('react-native-navigation');
import React, {Component} from 'react';
const {StyleSheet} = require('react-native');
import {View, Text, Card, Button, Badge, ListItem} from 'react-native-ui-lib';
import CountriesScreen from './Countries';

export let API_ROOT = 'https://api.covid19api.com';

class HomeScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <View>
          <Text marginB-s4 marginT-s4>🌍 Global</Text>
          <StatViewRow statLabel={'☣️ ACTIVE'} activeTotal={'789K'} activeNew={'+20K'}/>
          <StatViewRow statLabel={'🏥 RECOVERED'} activeTotal={'789K'} activeNew={'+20K'}/>
          <StatViewRow statLabel={'😵 DEAD'} activeTotal={'789K'} activeNew={'+20K'}/>
        </View>
      </View>
    );
  }
}

const StatViewRow = (props) => {
  return (
    <View padding={10} flexDirection={'row'}>
      <Text flex-1>{props.statLabel}</Text>
      <Text>{props.activeTotal}</Text>
      <Badge label={props.activeNew} backgroundColor={'red'}/>
    </View>
  );
};

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('CountriesScreen', () => CountriesScreen);
Navigation.registerComponent('CountryDetailScreen', () => CountryDetailScreen)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a',
    },
    topBar: {
      title: {
        color: 'white',
      },
      backButton: {
        color: 'white',
      },
      background: {
        color: '#4d089a',
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