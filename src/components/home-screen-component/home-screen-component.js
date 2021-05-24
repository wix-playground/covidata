import {CountryDetailCard} from '../country-detail-card/country-detail-card';
import {View} from 'react-native-ui-lib';
import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {HOME_TRACKED_LIST} from '../../test-ids';
import PropTypes from 'prop-types';

export class HomeScreenComponent extends React.Component {
  render() {
    return (
      <View flex padding-page>
        <FlatList
          ListHeaderComponent={
            <View>
              <CountryDetailCard country={this.props.globalData} />
              <View style={styles.divider} />
            </View>
          }
          testID={HOME_TRACKED_LIST}
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

HomeScreenComponent.propTypes = {
  globalData: PropTypes.object,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  countries: PropTypes.array,
};
