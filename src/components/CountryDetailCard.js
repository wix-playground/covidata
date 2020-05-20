import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StatDetailRow} from './StatDetailRow';

const emoji = require('country-to-emoji-flag');

export const CountryDetailCard = (props) => {
  const country = props.country;
  return (
    <Card
      padding={10}
      margin={10}
      style={{alignSelf: 'stretch'}}>
      <View
        margin={10}>
        <Text
          uppercase={true}
          text30H
          testID={`country_name_${country?.slug}`}>
          {tryEmoji(country?.country_code)} {country?.name}
        </Text>
      </View>
      <StatDetailRow
        stat_name={'Confirmed'}
        stat_total={country?.total_confirmed}
        stat_new={country?.new_confirmed}
        testID_prefix={country?.slug}/>
      <StatDetailRow
        stat_name={'Deaths'}
        stat_total={country?.total_deaths}
        stat_new={country?.new_deaths}
        testID_prefix={country?.slug}/>
      <StatDetailRow
        stat_name={'Recoveries'}
        stat_total={country?.total_recovered}
        stat_new={country?.new_recovered}
        recoveries={true}
        testID_prefix={country?.slug}/>
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

