import {Badge} from 'react-native-ui-lib';
import React from 'react';

export const ConditionalBadge = (props) => {
  return (props.recoveries
      ? <Badge
        label={`+${Number(props.new_confirmed)}`}
        backgroundColor={props.new_confirmed > 0 ? 'green' : 'orange'}
        testID={props.testID}/>
      : <Badge
        label={`+${Number(props.new_confirmed)}`}
        backgroundColor={props.new_confirmed > 0 ? 'red' : 'green'}
        testID={props.testID}/>
  );
};