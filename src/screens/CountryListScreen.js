import React, {Component} from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {CountryRow} from '../components/CountryRow';
import {CountrySummary} from '../utils/CountrySummary';
import {API_ROOT} from '../../env';

// separation of concerns, same as home screen.
// arrow functions used for components, you must be aware of the effect
// it may have on the app's performance. here's a reference for explanation:
// https://www.youtube.com/watch?v=WFoNIgtqrGI&amp;t=

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
          testID={'flat_list'}
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