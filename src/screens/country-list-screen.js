import React from 'react'
import { CountryRow } from '../components/country-row'
import { CountrySummary } from '../utils/country-summary'
import { API_ROOT } from '../../env'
import PropTypes from 'prop-types'
import { CountryListScreenComp } from '../components/country-list-screen-comp'

export class CountryListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  componentDidMount () {
    this.updateCountries()
  }

  render () {
    return (<CountryListScreenComp countries={this.state.countries} renderItem={this.renderItem.bind(this)}/>)
  }

  renderItem ({ item }) {
    return (<CountryRow componentId={this.props.componentId} country={item}/>)
  }

  updateCountries () {
    const countries = []
    // same comment as in home-screen regarding API
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const data = json.Countries
        for (const country of data) {
          countries.push(
            new CountrySummary(
              country.Country,
              country.Slug,
              country.CountryCode,
              country.TotalConfirmed,
              country.NewConfirmed,
              country.NewDeaths,
              country.TotalDeaths,
              country.NewRecovered,
              country.TotalRecovered)
          )
        }
        this.setState({ countries: countries })
      })
      .catch(error => console.error(error))
  }
}

CountryListScreen.propTypes = {
  componentId: PropTypes.string
}
