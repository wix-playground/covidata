import { Badge } from 'react-native-ui-lib'
import React from 'react'
import PropTypes from 'prop-types'
import { getBadgeColor } from '../utils/helper-methods'

// getBadgeColor could be local function, since, as I understand, it
// is needed for ConditionalBadge only. be mindful of separation of concerns
export const ConditionalBadge = React.memo(function ConditionalBadge ({ newConfirmed, testID, recoveries }) {
  return (<Badge
    label={`+${Number(newConfirmed)}`}
    backgroundColor={getBadgeColor(newConfirmed, recoveries)}
    testID={testID}/>)
})

ConditionalBadge.propTypes = {
  newConfirmed: PropTypes.number,
  testID: PropTypes.string,
  recoveries: PropTypes.bool
}
