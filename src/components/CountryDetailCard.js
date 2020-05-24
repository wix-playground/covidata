import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StatDetailRow} from './StatDetailRow';
import {tryEmoji} from '../utils/helper_methods';

export const CountryDetailCard = ({country}) => {
  return (
    <Card
      padding={10}
      margin={10}
      style={{alignSelf: 'stretch'}}>
      <View
        margin={10}>
        <Text
          uppercase
          text30H
          testID={`country_name_${country?.slug}`}>
          {tryEmoji(country?.countryCode)} {country?.name}
        </Text>
      </View>
      <StatDetailRow
        stat_name={'Confirmed'}
        stat_total={country?.totalConfirmed}
        stat_new={country?.newConfirmed}
        testID_prefix={country?.slug}/>
      <StatDetailRow
        stat_name={'Deaths'}
        stat_total={country?.totalDeaths}
        stat_new={country?.newDeaths}
        testID_prefix={country?.slug}/>
      <StatDetailRow
        stat_name={'Recoveries'}
        stat_total={country?.totalRecovered}
        stat_new={country?.newRecovered}
        recoveries={true}
        testID_prefix={country?.slug}/>
    </Card>
  );
};

