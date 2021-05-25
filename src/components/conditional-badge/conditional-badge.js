import {Badge} from 'react-native-ui-lib';
import React from 'react';
import PropTypes from 'prop-types';
import {getBadgeColor} from '../../utils/helper-methods';

export const ConditionalBadge = React.memo(function ConditionalBadge({
  newConfirmed,
  testID,
  recoveries,
}) {
  return (
    <Badge
      label={`+${Number(newConfirmed)}`}
      backgroundColor={getBadgeColor(newConfirmed, recoveries)}
      testID={testID}
    />
  );
});

ConditionalBadge.propTypes = {
  newConfirmed: PropTypes.number,
  testID: PropTypes.string,
  recoveries: PropTypes.bool,
};
