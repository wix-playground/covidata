import { FlatList, StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib'
import React from 'react'
import PropTypes from 'prop-types'

export const CountryListScreenComp = ({ countries, renderItem }) => {
  return (
    <View>
      <FlatList
        // moving testIDs to separate file and using them as constants would 
        // help you in both component tests and e2es
        testID={'flat_list'}
        data={countries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={separator}
      />
    </View>
  )
}

const keyExtractor = (item) => {
  return item.slug
}

const separator = () => {
  return (<View style={style.separator}/>)
}

const style = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CEDCCE'
  }
})

CountryListScreenComp.propTypes = {
  countries: PropTypes.array,
  renderItem: PropTypes.func
}
