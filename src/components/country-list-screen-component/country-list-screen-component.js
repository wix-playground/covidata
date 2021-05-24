import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import React from 'react';
import PropTypes from 'prop-types';
import {FLAT_COUNTRY_LIST} from '../../test-ids';

export const CountryListScreenComponent = React.memo(
  function CountryListScreenComp({countries, renderItem}) {
    return (
      <View>
        <FlatList
          testID={FLAT_COUNTRY_LIST}
          data={countries}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={separator}
        />
      </View>
    );
  },
);

const keyExtractor = (item) => {
  return item.Slug;
};

const separator = () => {
  return <View style={style.separator} />;
};

const style = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CEDCCE',
  },
});

CountryListScreenComponent.propTypes = {
  countries: PropTypes.array,
  renderItem: PropTypes.func,
};
