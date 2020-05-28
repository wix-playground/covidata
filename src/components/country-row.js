import { ListItem, View } from 'react-native-ui-lib'
import { Text } from 'react-native'
import { ConditionalBadge } from './conditional-badge'
import React from 'react'
import PropTypes from 'prop-types'
import { tryEmoji } from '../utils/helper-methods'
const { Navigation } = require('react-native-navigation')

export const CountryRow = ({ componentId, country }) => {
  return (
    <ListItem paddingL-15 paddingR-15
      testID={`${country.Slug}_row`}
      onPress={() => Navigation.push(componentId, {
        component: {
          name: 'CountryDetailScreen',
          passProps: {
            country: country
          }
        }
      })}
    >
      <View centerH flex flexDirection={'row'} testID={country.Slug}>
        <Text>{tryEmoji(country.CountryCode)}  </Text>
        <Text>{country.Country}</Text>
      </View>
      <View centerH flexDirection={'row'}>
        <Text>{country.TotalConfirmed?.toLocaleString()}   </Text>
        <ConditionalBadge newConfirmed={country.NewConfirmed}/>
      </View>
    </ListItem>
  )
}

CountryRow.propTypes = {
  componentId: PropTypes.string,
  country: PropTypes.object
}
