import {CountryDetailCard} from './country-detail-card';
import {View, Button} from '@wix/wix-react-native-ui-lib';
import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {TEST_ID_HOME_TRACKED_LIST} from '../test-ids';
import PropTypes from 'prop-types';
import {pushScreen} from '../navigation';
import {i18n} from '../../strings';

export class HomeScreenComp extends React.Component {
  openCountryList() {
    pushScreen(this.props.componentId, i18n('COUNTRIES_SCREEN'), {});
  }

  openNewsFeed() {
    pushScreen(this.props.componentId, i18n('NEWS_FEED_SCREEN'), {});
  }

  render() {
    return (
      <View flex padding-page>
        <View flex row>
          <Button onPress={() => this.openCountryList()}>{'B1'}</Button>
          <Button onPress={() => this.openNewsFeed()}>{'B2'}</Button>
        </View>
        <FlatList
          ListHeaderComponent={
            <View>
              <CountryDetailCard country={this.props.globalData} />
              <View style={styles.divider} />
            </View>
          }
          testID={TEST_ID_HOME_TRACKED_LIST}
          data={this.props.countries}
          renderItem={this.props.renderItem}
          keyExtractor={this.props.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#d1d0d1',
    height: 1,
  },
});

HomeScreenComp.propTypes = {
  globalData: PropTypes.object,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  countries: PropTypes.array,
};
