import React, {Component} from 'react';
import {View, Text, Card} from 'react-native-ui-lib';
import {ConditionalBadge} from './Countries';

const emoji = require('country-to-emoji-flag');

export class CountryDetailScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let country = this.props.country;
    return (
      <View center>
        <Text>{emoji(country.country_code)}{country.name}</Text>
        <Card padding={10}>
          <View flexDirection={'row'}>
            <Text>Confirmed: {country.total_confirmed}</Text>
            <ConditionalBadge new_confirmed={country.new_confirmed}/>
          </View>
          <View flexDirection={'row'}>
            <Text>Deaths: {country.total_deaths}</Text>
            <ConditionalBadge new_confirmed={country.new_deaths}/>
          </View>
          <View flexDirection={'row'}>
            <Text>Recoveries: {country.total_recovered}</Text>
            <ConditionalBadge new_confirmed={country.new_recovered}/>
          </View>
        </Card>
      </View>
    );
  }
}
