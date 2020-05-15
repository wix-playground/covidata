import React, {Component} from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {API_ROOT} from '../../index';
import {CountryRow} from '../components/CountryRow';
import {CountrySummary} from '../utils/CountrySummary';

class CountryListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }
  componentDidMount() {
    this.updateCountries();
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.countries}
          renderItem={({item}) =>
            <CountryRow componentId={this.props.componentId} country={item}/>}
          keyExtractor={((item) => item.slug)}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{height: 1, width: '100%', backgroundColor: '#CEDCCE'}}/>);
          }}/>
      </View>
    );
  }

  updateCountries() {
    let countries = [];
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        let data = json['Countries'];
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
        this.setState({countries: countries});
      })
      .catch(error => console.error(error));
  }
}

CountryListScreen.options = {
  topBar: {
    title: {
      text: 'Countries',
    },
  },
  bottomTab: {
    text: 'Countries',
  },
};


export default CountryListScreen;