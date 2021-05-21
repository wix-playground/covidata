import {ScrollView, StyleSheet} from 'react-native';
import {CountryDetailCard} from './country-detail-card';
import {Card, Text, View, Switch} from '@wix/wix-react-native-ui-lib';
import {CasesChangeGraph} from './cases-change-graph';
import React from 'react';
import PropTypes from 'prop-types';
import {TEST_ID_TRACKING_SWITCH} from '../test-ids';
import {i18n} from '../../strings';

export const CountryDetailScreenComp = React.memo(
  function CountryDetailsScreenComp({
    country,
    track,
    onValueChange,
    labels,
    data,
  }) {
    return (
      <ScrollView flex>
        <CountryDetailCard country={country} />
        <Card
          flexDirection={'row'}
          style={styles.trackCard}
          padding={20}
          margin={10}>
          <Text flex text60BO>
            {i18n('TRACK')}
          </Text>
          <Switch
            testID={TEST_ID_TRACKING_SWITCH}
            value={track}
            onValueChange={onValueChange}
          />
        </Card>
        <Card padding={20} margin={10} flexDirection={'column'}>
          <View>
            <Text text60M style={styles.cardTitle}>
              {i18n('RECENT_DATA')}
            </Text>
          </View>
          <View>
            <CasesChangeGraph labels={labels} data={data} />
          </View>
        </Card>
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  trackCard: {
    alignSelf: 'stretch',
  },
  cardTitle: {
    marginBottom: 30,
  },
});

CountryDetailScreenComp.propTypes = {
  country: PropTypes.object,
  track: PropTypes.bool,
  onValueChange: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array,
};
