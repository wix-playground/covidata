import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ConditionalBadge} from './ConditionalBadge';

const emoji = require('country-to-emoji-flag');
const NUMBER_OF_DAYS_MAX = 15;

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

const StatDetailRow = (props) => {
  return (
    <View margin={10} flexDirection={'row'}>
      <View flex>
        <Text text60L>{props.stat_name}</Text>
        <Text text50M>{props.stat_total.toLocaleString()}</Text>
      </View>
      <ConditionalBadge new_confirmed={props.stat_new} recoveries={props.recoveries ?? false}/>
    </View>
  );
};

export const CasesChangeGraph = (props) => {
  return (
    <LineChart
      data={{labels: props.labels.slice(Math.max(props.labels.length-NUMBER_OF_DAYS_MAX, 0)),
        datasets: [{data: props.data.slice(Math.max(props.data.length-NUMBER_OF_DAYS_MAX, 0))}]}}
      width={Dimensions.get('window').width-80}
      height={300}
      fromZero
      verticalLabelRotation={90}
      xLabelsOffset={1}
      chartConfig={{
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `#000`,
      }}
    />
  );
}