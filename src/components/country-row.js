import {ListItem, View} from '@wix/wix-react-native-ui-lib';
import {Text} from 'react-native';
import {ConditionalBadge} from './conditional-badge';
import React from 'react';
import PropTypes from 'prop-types';
import {tryEmoji} from '../utils/helper-methods';
import {TEST_ID_COUNTRY_ROW, TEST_ID_COUNTRY_SLUG} from '../test-ids';
import {COUNTRY_DETAIL_SCREEN} from '../strings';
import {pushScreen} from '../navigation';

export const CountryRow = React.memo(function CountryRow({
  componentId,
  country,
}) {
  return (
    <ListItem
      paddingL-15
      paddingR-15
      testID={TEST_ID_COUNTRY_ROW(country.Slug)}
      onPress={() => pushCountryDetailScreen(componentId, country)}>
      <View
        centerH
        flex
        flexDirection={'row'}
        testID={TEST_ID_COUNTRY_SLUG(country.Slug)}>
        <Text>{tryEmoji(country.CountryCode)} </Text>
        <Text>{country.Country}</Text>
      </View>
      <View centerH flexDirection={'row'}>
        <Text>{country.TotalConfirmed?.toLocaleString()} </Text>
        <ConditionalBadge newConfirmed={country.NewConfirmed} />
      </View>
    </ListItem>
  );
});

const pushCountryDetailScreen = (componentId, country) => {
  pushScreen(componentId, COUNTRY_DETAIL_SCREEN, {country});
};

CountryRow.propTypes = {
  componentId: PropTypes.string,
  country: PropTypes.object,
};
