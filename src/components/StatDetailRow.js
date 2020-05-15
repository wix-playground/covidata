import {Text, View} from 'react-native-ui-lib';
import {ConditionalBadge} from './ConditionalBadge';
import React from 'react';

export const StatDetailRow = (props) => {
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