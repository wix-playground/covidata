import {ListItem, View} from '@wix/wix-react-native-ui-lib';
import {Text} from 'react-native';
import {ConditionalBadge} from '../conditional-badge/conditional-badge';
import React from 'react';
import PropTypes from 'prop-types';
import {tryEmoji} from '../../utils/helper-methods';
import {GET_COUNTRY_ROW, GET_COUNTRY_SLUG} from '../../test-ids';
import {pushScreen} from '../../navigation';
import { i18n } from "../../../strings";

export const CountryRow = React.memo(function CountryRow({
  componentId,
  country,
}) {
  return (
    <ListItem
      paddingL-15
      paddingR-15
      testID={GET_COUNTRY_ROW(country.slug)}
      onPress={() => pushCountryDetailScreen(componentId, country)}>
      <View
        centerH
        flex
        flexDirection={'row'}
        testID={GET_COUNTRY_SLUG(country.slug)}>
        <Text>{tryEmoji(country.countryCode)} </Text>
        <Text>{country.country}</Text>
      </View>
      <View centerH flexDirection={'row'}>
        <Text>{country.totalConfirmed?.toLocaleString()} </Text>
        <ConditionalBadge newConfirmed={country.newConfirmed} />
      </View>
    </ListItem>
  );
});

const pushCountryDetailScreen = (componentId, country) => {
  pushScreen(componentId, i18n('COUNTRY_DETAIL_SCREEN'), {country});
};

CountryRow.propTypes = {
  componentId: PropTypes.string,
  country: PropTypes.object,
};
