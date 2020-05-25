import { CountryDetailCard } from './country-detail-card'
import { View } from 'react-native-ui-lib'
import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

export const HomeScreenComp = ({ globalData }) => {
  return (
    <ScrollView flex padding-page>
      <CountryDetailCard country={globalData}/>
      <View>
        <View style={styles.divider}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  divider: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#d1d0d1',
    height: 1
  }
})

HomeScreenComp.propTypes = {
  globalData: PropTypes.object
}