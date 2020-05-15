import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StatDetailRow} from './StatDetailRow';

const emoji = require('country-to-emoji-flag');
export const NUMBER_OF_DAYS_MAX = 15;

export const CountryDetailCard = (props) => {
  return (
    <Card padding={10} margin={10} style={{alignSelf: 'stretch'}}>
      <View margin={10}>
        <Text uppercase={true} text30H>{tryEmoji(props.country.country_code)} {props.country.name}
        </Text>
      </View>
      <StatDetailRow
        stat_name={'Confirmed'}
        stat_total={props.country.total_confirmed}
        stat_new={props.country.new_confirmed} />
      <StatDetailRow
        stat_name={'Deaths'}
        stat_total={props.country.total_deaths}
        stat_new={props.country.new_deaths} />
      <StatDetailRow
        stat_name={'Recoveries'}
        stat_total={props.country.total_recovered}
        stat_new={props.country.new_recovered}
        recoveries={true} />
    </Card>
  );
};

function tryEmoji(code) {
  try {
    return emoji(code);
  } catch(e) {
    return "🌍"
  }
}

