import React from 'react'
import { View } from 'react-native-ui-lib'
import { CountrySummary } from '../utils/country-summary'
import { CountryDetailCard } from '../components/country-detail-card'
import { ScrollView } from 'react-native'
import { API_ROOT } from '../../env'

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
    return (
      <ScrollView flex padding-page>
        <CountryDetailCard country={this.state.globalData}/>
        <View>
          <View style={{
            marginLeft: 50,
            marginRight: 50,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#d1d0d1',
            height: 1
          }}/>
        </View>
      </ScrollView>
    )
  }

  getData () {
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const globalData = json.Global
        const global = (
          new CountrySummary(
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
        this.setState({
          globalData: global,
          countries: countries
        })
      })
      .catch(error => console.error(error))
  }
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home'
    }
  },
  bottomTab: {
    text: 'Home'
  }
}
