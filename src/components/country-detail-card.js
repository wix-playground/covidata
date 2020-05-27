import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native'
import {StatDetailRow} from './stat-detail-row';
import {tryEmoji} from '../utils/helper-methods';

// home-screen-comp has globalData defined as props,
// while this screen could really use defined props that
// are being used inside this component
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
          testID={`country_name_${country?.slug}`}>
          {`${tryEmoji(country?.countryCode)} ${country?.name}`}
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

const styles = StyleSheet.create({
  align: {
    alignSelf: 'stretch'
  }
})
