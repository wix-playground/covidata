import { Badge } from 'react-native-ui-lib'
import React from 'react'
import PropTypes from 'prop-types'
import { getBadgeColor } from '../utils/helper-methods'

/*
  read about React.memo and React.PureComponent (for class components)
  https://reactjs.org/docs/react-api.html#reactmemo

  it's worth using them (especially on mobile where performance is really important) to avoid unnecessary re-renders
*/
export const ConditionalBadge = ({ newConfirmed, testID, recoveries }) => {
  return (<Badge
    label={`+${Number(newConfirmed)}`}
    backgroundColor={getBadgeColor(newConfirmed, recoveries)}
    testID={testID}/>)
}

ConditionalBadge.propTypes = {
  newConfirmed: PropTypes.number,
  testID: PropTypes.string,
  recoveries: PropTypes.bool
}
