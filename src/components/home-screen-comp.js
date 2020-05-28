import { CountryDetailCard } from './country-detail-card'
import { View } from 'react-native-ui-lib'
import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class HomeScreenComp extends React.Component {
  render () {
    return (
      <ScrollView flex padding-page>
        <CountryDetailCard country={this.props.globalData}/>
        <View>
          <View style={styles.divider}/>
        </View>
      </ScrollView>
    )
  }
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
  globalData: PropTypes.shape({
    NewConfirmed: PropTypes.number,
    TotalConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    TotalDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
    TotalRecovered: PropTypes.number
  })
}

const mapStateToProps = state => {
  return {
    globalData: state.globalData
  }
}

export default connect(mapStateToProps)(HomeScreenComp)
