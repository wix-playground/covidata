import {Text, View} from 'react-native-ui-lib';
import {ConditionalBadge} from './ConditionalBadge';
import React from 'react';
import PropTypes from 'prop-types'

export const StatDetailRow = ({testID_prefix, stat_name, stat_total, stat_new, recoveries}) => {
    return (
      <View margin={10} flexDirection={'row'}>
        <View flex>
          <Text
            text60L
            testID={`${testID_prefix}_${stat_name}`}>
            {stat_name}
          </Text>
          <Text
            text50M
            testID={`${testID_prefix}_${stat_name}_total`}>
            {stat_total?.toLocaleString()}
          </Text>
        </View>
        <ConditionalBadge
          newConfirmed={stat_new}
          recoveries={recoveries ?? false}
          testID={`${testID_prefix}_${stat_name}_new`}/>
      </View>
    );
}

StatDetailRow.propTypes = {
  testID_prefix: PropTypes.string,
  stat_name: PropTypes.string,
  stat_total: PropTypes.number,
  stat_new: PropTypes.number,
  recoveries: PropTypes.bool
}