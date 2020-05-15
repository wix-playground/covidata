import React, {Component} from 'react';
import {View} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {API_ROOT} from './index';
import {CountryRow} from './src/components/CountryRow';

class CountrySummary {
  constructor(
    name,
    slug,
    country_code,
    total_confirmed,
    new_confirmed,
    new_deaths,
    total_deaths,
    new_recovered,
    total_recovered,
  ) {
    this.name = name;
    this.slug = slug;
    this.country_code = country_code;
    this.total_confirmed = total_confirmed;
    this.new_confirmed = new_confirmed;
    this.new_deaths = new_deaths;
    this.total_deaths = total_deaths;
    this.new_recovered = new_recovered;
    this.total_recovered = total_recovered;
  }
}

class CountriesScreen extends Component {

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

  async updateCountries() {
    let countries = [];
    await fetch(`${API_ROOT}/summary`)
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

CountriesScreen.options = {
  topBar: {
    title: {
      text: 'Countries',
    },
  },
  bottomTab: {
    text: 'Countries',
  },
};


export default CountriesScreen;