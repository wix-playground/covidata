import React from 'react'
import PropTypes from 'prop-types'
import { CountryDetailScreenComp } from '../components/country-detail-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { countryPropTypes } from '../prop-types'
import { fetchCountryStatsAction, setCountryTrackedAction } from '../redux/actions'
import { LoaderScreen } from 'react-native-ui-lib'

class CountryDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: this.props.country,
      track: false
    }
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentDidMount () {
    const countrySlug = this.props.country.Slug
    this.props.fetchCountryStatsAction(countrySlug)
  }

  render () {
    return (this.props.pending
      ? <LoaderScreen overlay/>
      : <CountryDetailScreenComp
        country={this.state.country}
        track={this.props.tracked.includes(this.props.country.Slug)}
        onValueChange={this.onValueChange}
        labels={this.props.labels}
        data={this.props.data}/>
    )
  }

  onValueChange (value) {
    this.props.setCountryTrackedAction(this.props.country.Slug, value)
  }
}

CountryDetailScreen.propTypes = {
  country: countryPropTypes,
  fetchCountryStatsAction: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array,
  pending: PropTypes.bool,
  setCountryTrackedAction: PropTypes.func,
  tracked: PropTypes.array
}

const mapStateToProps = state => ({
  data: state.data,
  labels: state.labels,
  pending: state.pending,
  tracked: state.tracked
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCountryStatsAction: fetchCountryStatsAction,
  setCountryTrackedAction: setCountryTrackedAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetailScreen)
