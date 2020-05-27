import React from 'react'
import { CountrySummary } from '../utils/country-summary'
import { API_ROOT } from '../../env'
import { HomeScreenComp } from '../components/home-screen-comp'

export class HomeScreen extends React.Component {

  state = {
    globalData: undefined,
    countries: [],
    trackedSlugs: []
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (<HomeScreenComp globalData={this.state.globalData}/>)
  }

  getData () {
    // same comment as previously. I suggest having a separate
    // file wrapping your API requests. The following could
    // be replaced by a clear and readable CovidApi.getSummary()
    // or similar
    // getData could have a more descriptive name
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const globalData = json.Global
        const global = (
          CountrySummary(
            'Global',
            'global',
            '',
            globalData.TotalConfirmed,
            globalData.NewConfirmed,
            globalData.NewDeaths,
            globalData.TotalDeaths,
            globalData.NewRecovered,
            globalData.TotalRecovered)
        )
        const countries = []
        const countriesData = json.Countries
        for (const country of countriesData) {
          countries.push(
            CountrySummary(
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
        this.setState({
          globalData: global,
          countries: countries
        })
      })
      .catch(error => console.error(error))
  }
}

