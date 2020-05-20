import {Text, View} from 'react-native-ui-lib';
import {ConditionalBadge} from './ConditionalBadge';
import React from 'react';

export const StatDetailRow = (props) => {
  return (
    <View margin={10} flexDirection={'row'}>
      <View flex>
        <Text
          text60L
          testID={`${props.testID_prefix}_${props.stat_name}`}>
          {props.stat_name}
        </Text>
        <Text
          text50M
          testID={`${props.testID_prefix}_${props.stat_name}_total`}>
          {props.stat_total?.toLocaleString()}
        </Text>
      </View>
      <ConditionalBadge
        new_confirmed={props.stat_new}
        recoveries={props.recoveries ?? false}
        testID={`${props.testID_prefix}_${props.stat_name}_new`}/>
    </View>
  );
};