import {Text, View} from 'react-native-ui-lib';
import {ConditionalBadge} from './conditional-badge';
import React from 'react';
import PropTypes from 'prop-types'
import {TEST_ID_STAT_PREFIX_NAME, TEST_ID_STAT_PREFIX_NAME_NEW, TEST_ID_STAT_PREFIX_NAME_TOTAL} from '../test-ids';

export const StatDetailRow = React.memo(function StatDetailRow ({testIdPrefix, statName, statTotal, statNew, recoveries}) {
    return (
      <View margin={10} flexDirection={'row'}>
        <View flex>
          <Text
            text60L
            testID={TEST_ID_STAT_PREFIX_NAME(testIdPrefix, statName)}>
            {statName}
          </Text>
          <Text
            text50M
            testID={TEST_ID_STAT_PREFIX_NAME_TOTAL(testIdPrefix, statName)}>
            {statTotal?.toLocaleString()}
          </Text>
        </View>
        <ConditionalBadge
          newConfirmed={statNew}
          recoveries={recoveries ?? false}
          testID={TEST_ID_STAT_PREFIX_NAME_NEW(testIdPrefix, statName)}/>
      </View>
    );
})

StatDetailRow.propTypes = {
  testIdPrefix: PropTypes.string,
  statName: PropTypes.string,
  statTotal: PropTypes.number,
  statNew: PropTypes.number,
  recoveries: PropTypes.bool
}