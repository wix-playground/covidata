import {ListItem, View} from 'react-native-ui-lib';
import {Text} from 'react-native';
import {ConditionalBadge} from './Badge';
import React from 'react';
const {Navigation} = require('react-native-navigation');

const emoji = require('country-to-emoji-flag');

export const CountryRow = (props) => {
  return (
    <ListItem paddingL-15 paddingR-15
              onPress={() => Navigation.push(props.componentId, {
                component: {
                  name: 'CountryDetailScreen',
                  passProps: {
                    country: props.country,
                  },
                },
              })}>
      <View centerH flex flexDirection={'row'}>
        <Text>{emoji(props.country.country_code)}  </Text>
        <Text>{props.country.name}</Text>
      </View>
      <View centerH flexDirection={'row'}>
        <Text>{props.country.total_confirmed.toLocaleString()}   </Text>
        <ConditionalBadge new_confirmed={props.country.new_confirmed}/>
      </View>
    </ListItem>
  );
};