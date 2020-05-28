import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native'
import {StatDetailRow} from './stat-detail-row';
import {tryEmoji} from '../utils/helper-methods';

export const CountryDetailCard = ({country}) => {
  return (
    <Card
      padding={10}
      margin={10}
      style={styles.align}>
      <View
        margin={10}>
        <Text
          uppercase
          text30H
          testID={`country_name_${country.Slug || "global"}`}>
          {`${tryEmoji(country?.CountryCode)} ${country?.Country || "Global"}`}
        </Text>
      </View>
      <StatDetailRow
        stat_name={'Confirmed'}
        stat_total={country?.TotalConfirmed}
        stat_new={country?.NewConfirmed}
        testID_prefix={country?.Slug || "global"}/>
      <StatDetailRow
        stat_name={'Deaths'}
        stat_total={country?.TotalDeaths}
        stat_new={country?.NewDeaths}
        testID_prefix={country?.Slug || "global"}/>
      <StatDetailRow
        stat_name={'Recoveries'}
        stat_total={country?.TotalRecovered}
        stat_new={country?.NewRecovered}
        recoveries={true}
        testID_prefix={country?.Slug || "global"}/>
    </Card>
  );
};

const styles = StyleSheet.create({
  align: {
    alignSelf: 'stretch'
  }
})
