import { ListItem, View } from 'react-native-ui-lib'
import { Text } from 'react-native'
import { ConditionalBadge } from './ConditionalBadge'
import React from 'react'
import PropTypes from 'prop-types'
import { tryEmoji } from '../utils/helper_methods'
const { Navigation } = require('react-native-navigation')

export const CountryRow = ({ componentId, country }) => {
  return (
    <ListItem paddingL-15 paddingR-15
      onPress={() => Navigation.push(componentId, {
        component: {
          name: 'CountryDetailScreen',
          passProps: {
            country: country
          }
        }
      })}
    >
      <View centerH flex flexDirection={'row'} testID={country.slug}>
        <Text>{tryEmoji(country.countryCode)}  </Text>
        <Text>{country.name}</Text>
      </View>
      <View centerH flexDirection={'row'}>
        <Text>{country.totalConfirmed.toLocaleString()}   </Text>
        <ConditionalBadge newConfirmed={country.newConfirmed}/>
      </View>
    </ListItem>
  )
}

CountryRow.propTypes = {
  componentId: PropTypes.string,
  country: PropTypes.object
}
