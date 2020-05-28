import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native'
import {StatDetailRow} from './stat-detail-row';
import {tryEmoji} from '../utils/helper-methods';
import {TEST_ID_COUNTRY_NAME, TEST_ID_COUNTRY_SLUG} from '../test-ids';
import {CONFIRMED, DEATHS, GLOBAL, RECOVERIES} from '../strings';

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
          testID={TEST_ID_COUNTRY_NAME(country.Slug)}>
          {`${tryEmoji(country.CountryCode)} ${country.Country || GLOBAL}`}
        </Text>
      </View>
      <StatDetailRow
        stat_name={CONFIRMED}
        stat_total={country.TotalConfirmed}
        stat_new={country.NewConfirmed}
        testID_prefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
      <StatDetailRow
        stat_name={DEATHS}
        stat_total={country.TotalDeaths}
        stat_new={country.NewDeaths}
        testID_prefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
      <StatDetailRow
        stat_name={RECOVERIES}
        stat_total={country.TotalRecovered}
        stat_new={country.NewRecovered}
        recoveries={true}
        testID_prefix={TEST_ID_COUNTRY_SLUG(country.Slug)}/>
    </Card>
  );
};

const styles = StyleSheet.create({
  align: {
    alignSelf: 'stretch'
  }
})
