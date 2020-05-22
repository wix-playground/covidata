import React, {Component} from 'react';
import {View} from 'react-native-ui-lib';
import {CountrySummary} from '../utils/CountrySummary';
import {CountryDetailCard} from '../components/CountryDetailCard';
import {ScrollView} from 'react-native';
import {API_ROOT} from '../../env';

export class HomeScreen extends Component {
  /*
    you can get rid of constructor and keep state as a class property
    state = {
      globalData: undefined,
      countries: [],
      tracked_slugs: [],
    }
    also, try to keep naming consistent, now you're mixing camelCase and snake_case
  */
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
          {/* avoid inline styles as they cause re-renders, use StyleSheet.create() */}
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

  /* fetchData or getData would be a better name for this, updateGlobal doesn't tell that it will load data */
  updateGlobal() {
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const globalData = json['Global'];
        /* if you're not mutating data, use const instead of let */
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
        /* since you have globalData above, I would suggest naming it to countriesData */
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