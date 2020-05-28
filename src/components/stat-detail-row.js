import {Text, View} from 'react-native-ui-lib';
import {ConditionalBadge} from './conditional-badge';
import React from 'react';
import PropTypes from 'prop-types'
import {TEST_ID_STAT_PREFIX_NAME, TEST_ID_STAT_PREFIX_NAME_NEW, TEST_ID_STAT_PREFIX_NAME_TOTAL} from '../test-ids';

export const StatDetailRow = ({testID_prefix, stat_name, stat_total, stat_new, recoveries}) => {
    return (
      <View margin={10} flexDirection={'row'}>
        <View flex>
          <Text
            text60L
            testID={TEST_ID_STAT_PREFIX_NAME(testID_prefix, stat_name)}>
            {stat_name}
          </Text>
          <Text
            text50M
            testID={TEST_ID_STAT_PREFIX_NAME_TOTAL(testID_prefix, stat_name)}>
            {stat_total?.toLocaleString()}
          </Text>
        </View>
        <ConditionalBadge
          newConfirmed={stat_new}
          recoveries={recoveries ?? false}
          testID={TEST_ID_STAT_PREFIX_NAME_NEW(testID_prefix, stat_name)}/>
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