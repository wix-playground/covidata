import {Card, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import {StatDetailRow} from '../stat-detail-row/stat-detail-row';
import PropTypes from 'prop-types';
import {tryEmoji} from '../../utils/helper-methods';
import {GET_COUNTRY_NAME, GET_COUNTRY_SLUG} from '../../test-ids';
import {CONFIRMED, DEATHS, GLOBAL, RECOVERIES} from '../../strings';

export const CountryDetailCard = React.memo(function CountryDetailCard({
  country,
}) {
  return (
    <Card padding={10} margin={10} style={styles.align}>
      <View margin={10}>
        <Text uppercase text30H testID={GET_COUNTRY_NAME(country.slug)}>
          {`${tryEmoji(country.countryCode)} ${country.country || GLOBAL}`}
        </Text>
      </View>
      <StatDetailRow
        statName={CONFIRMED}
        statTotal={country.totalConfirmed}
        statNew={country.newConfirmed}
        testIdPrefix={GET_COUNTRY_SLUG(country.slug)}
      />
      <StatDetailRow
        statName={DEATHS}
        statTotal={country.totalDeaths}
        statNew={country.newDeaths}
        testIdPrefix={GET_COUNTRY_SLUG(country.slug)}
      />
      <StatDetailRow
        statName={RECOVERIES}
        statTotal={country.totalRecovered}
        statNew={country.newRecovered}
        recoveries={true}
        testIdPrefix={GET_COUNTRY_SLUG(country.slug)}
      />
    </Card>
  );
});

CountryDetailCard.propTypes = {
  country: PropTypes.object,
};

const styles = StyleSheet.create({
  align: {
    alignSelf: 'stretch',
  },
});
