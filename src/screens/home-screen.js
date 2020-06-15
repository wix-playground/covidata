import React from 'react'
import { HomeScreenComp } from '../components/home-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchSummary } from '../redux/actions'
import { LoaderScreen } from 'react-native-ui-lib'
import { globalDataPropTypes } from '../prop-types'
import { CountryDetailCard } from '../components/country-detail-card'

class HomeScreen extends React.Component {
  componentDidMount () {
    this.props.fetchSummaryAction()
    this.renderItem = this.renderItem.bind(this)
  }

  render () {
    return (this.props.pending
      ? <LoaderScreen overlay/>
      : <HomeScreenComp
        globalData={this.props.globalData}
        countries={this.props.countries}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}/>
    )
  }

  // renderItem and keyExtractor should probably be part of HomeScreenComp.
  // implementation details are leaking to the screen component and screen knows
  // about the deeper components of the component it is rendering. code becomes
  // confusing as it's description :-)
  renderItem ({ item }) {
    return (this.props.tracked.includes(item.Slug)
      ? <CountryDetailCard country={item}/>
      : null)
  }

  keyExtractor (item) {
    return item.Slug
  }
}

HomeScreen.propTypes = {
  fetchSummaryAction: PropTypes.func,
  pending: PropTypes.bool,
  globalData: globalDataPropTypes,
  countries: PropTypes.array,
  tracked: PropTypes.array
}

const mapStateToProps = state => {
  return {
    pending: state.pending,
    globalData: state.globalData,
    countries: state.countries,
    tracked: state.tracked
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSummaryAction: fetchSummary
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
