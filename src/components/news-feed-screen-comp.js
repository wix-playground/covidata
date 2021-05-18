import { FlatList, StyleSheet } from 'react-native'
import { View } from 'react-native-ui-lib'
import React from 'react'
import PropTypes from 'prop-types'

export const NewsFeedScreenComp = React.memo(function NewsFeedScreenComp ({ articles, renderItem }) {
  return (
    <View>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={separator}
      />
    </View>
  )
})

const keyExtractor = (item, index) => {
  return index.toString()
}

const separator = () => {
  return (<View style={style.separator}/>)
}

const style = StyleSheet.create({
  separator: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#d1d0d1',
    height: 1
  }
})

NewsFeedScreenComp.propTypes = {
  articles: PropTypes.array,
  renderItem: PropTypes.func
}
