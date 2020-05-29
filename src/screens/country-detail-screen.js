import React from 'react'
import PropTypes from 'prop-types'
import { CountryDetailScreenComp } from '../components/country-detail-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { countryPropTypes } from '../prop-types'
import { fetchCountryStatsAction } from '../redux/actions'

export class CountryDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: this.props.country,
      track: false
    }
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentDidMount () {
    const countrySlug = this.state.country.Slug
    this.props.fetchCountryStatsAction(countrySlug)
  }

  render () {
    return (<CountryDetailScreenComp
      country={this.state.country}
      track={this.state.track}
      onValueChange={this.onValueChange}
      labels={this.props.labels}
      data={this.props.data}/>)
  }

  onValueChange (value) {
    this.setState({ track: value })
  }
}

CountryDetailScreen.propTypes = {
  country: countryPropTypes,
  fetchCountryStatsAction: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array
}

const mapStateToProps = state => ({
  data: state.data,
  labels: state.labels
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCountryStatsAction: fetchCountryStatsAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetailScreen)
