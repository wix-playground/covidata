import React from 'react'
import { View } from 'react-native-ui-lib'
import { FlatList } from 'react-native'
import { CountryRow } from '../components/country-row'
import { CountrySummary } from '../utils/country-summary'
import { API_ROOT } from '../../env'
import PropTypes from 'prop-types'

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
    return (
      <View>
        <FlatList
          testID={'flat_list'}
          data={this.state.countries}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.separator}
        />
      </View>
    )
  }

  renderItem ({ item }) {
    return (<CountryRow componentId={this.props.componentId} country={item}/>)
  }

  keyExtractor (item) {
    return item.slug
  }

  separator () {
    return (<View style={{ height: 1, width: '100%', backgroundColor: '#CEDCCE' }}/>)
  }

  updateCountries () {
    const countries = []
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

CountryListScreen.options = {
  topBar: {
    title: {
      text: 'Countries'
    }
  },
  bottomTab: {
    text: 'Countries'
  }
}

CountryListScreen.propTypes = {
  componentId: PropTypes.string
}