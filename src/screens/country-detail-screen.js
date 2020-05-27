import React from 'react'
import { API_ROOT } from '../../env'
import PropTypes from 'prop-types'
import { CountryDetailScreenComp } from '../components/country-detail-screen-comp'

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
    /*
       .bind will create new function every render
       you either need to use arrow function (onValueChange = value => ...) or use .bind in constructor
       constructor (props) {
         super(props)
         ...
         this.onValueChange = this.onValueChange.bind(this)
       }

       in Events we use arrow functions as constructors are basically not needed (state assignment can be moved outside of it)
    */
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
    /*
      to keep components more clear, I would suggest moving API logic out of them, e.g.:

      import {getCountryDetail} from '../utils/api

      ...

      async getCountryDetail () {
        const {labels, data} = await getCountryDetail(this.state.country.slug)
        this.setState({ labels, data })
      }
    */
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
