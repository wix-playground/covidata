import React, {Component} from 'react';
import {View} from 'react-native-ui-lib';
import {CountrySummary} from '../utils/CountrySummary';
import {CountryDetailCard} from '../components/CountryDetailCard';
import {ScrollView} from 'react-native';
import {API_ROOT} from '../../env';

// eslint / prettier integration is recommended as most of the screen is
// cluttered with warings :-)
// again separation of concerns: styles and API
// for api I suggest having a wrapper with very clear API methods

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalData: undefined,
      countries: [],
      tracked_slugs: [],
    };
  }

  componentDidMount() {
    this.updateGlobal();
  }

  render() {
    return (
      <ScrollView flex padding-page>
        <CountryDetailCard country={this.state.globalData}/>
        <View>
          <View style={{
            marginLeft: 50,
            marginRight: 50,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#d1d0d1',
            height: 1,
          }}/>
        </View>
      </ScrollView>
    );
  }

  updateGlobal() {
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const globalData = json['Global'];
        let global = (
          new CountrySummary(
            'Global',
            'global',
            '',
            globalData['TotalConfirmed'],
            globalData['NewConfirmed'],
            globalData['NewDeaths'],
            globalData['TotalDeaths'],
            globalData['NewRecovered'],
            globalData['TotalRecovered'])
        );
        let countries = [];
        const data = json['Countries'];
        for (let country of data) {
          countries.push(
            new CountrySummary(
              country['Country'],
              country['Slug'],
              country['CountryCode'],
              country['TotalConfirmed'],
              country['NewConfirmed'],
              country['NewDeaths'],
              country['TotalDeaths'],
              country['NewRecovered'],
              country['TotalRecovered']),
          );
        }
        this.setState({
          globalData: global,
          countries: countries,
        });
      })
      .catch(error => console.error(error));
  }
}

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