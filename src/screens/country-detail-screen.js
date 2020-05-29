import React from 'react'
import PropTypes from 'prop-types'
import { CountryDetailScreenComp } from '../components/country-detail-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCountryData } from '../api/fetch-country-data'
import { countryPropTypes } from '../prop-types'

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
    this.props.fetchCountryData(countrySlug)
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
  fetchCountryData: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array
}

const mapStateToProps = state => ({
  data: state.data,
  labels: state.labels
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCountryData: fetchCountryData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetailScreen)
