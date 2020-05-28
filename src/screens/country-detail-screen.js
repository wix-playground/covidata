import React from 'react'
import { API_ROOT } from '../../env'
import PropTypes from 'prop-types'
import { CountryDetailScreenComp } from '../components/country-detail-screen-comp'
import { connect } from 'react-redux'


export class CountryDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: this.props.country,
      labels: [],
      data: [0],
      track: false
    }
  }

  componentDidMount () {
    this.getCountryDetail()
  }

  render () {
    return (<CountryDetailScreenComp
      country={this.state.country}
      track={this.state.track}
      onValueChange={this.onValueChange.bind(this)}
      labels={this.state.labels}
      data={this.state.data}/>)
  }

  onValueChange (value) {
    this.setState({ track: value })
  }

  async getCountryDetail () {
    const labels = []
    const data = []
    await fetch(`${API_ROOT}/total/dayone/country/${this.state.country.slug}`)
      .then(response => response.json())
      .then(json => {
        for (const dataPoint of json) {
          const date = new Date(Date.parse(dataPoint.Date))
          labels.push(`${date.getDate()}/${+date.getMonth() + 1}`)
          data.push(dataPoint.Confirmed)
        }
        this.setState({ labels: labels, data: data })
      })
      .catch(error => console.error(error))
  }
}

CountryDetailScreen.propTypes = {
  country: PropTypes.object
}

export default connect()(CountryDetailScreen)
