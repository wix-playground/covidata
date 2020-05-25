import React from 'react'
import { View, Text, Card } from 'react-native-ui-lib'
import { CountryDetailCard } from '../components/country-detail-card'
import { ScrollView, Switch, StyleSheet } from 'react-native'
import { CasesChangeGraph } from '../components/cases-change-graph'
import { API_ROOT } from '../../env'
import PropTypes from 'prop-types'

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
    return (
      <ScrollView flex>
        <CountryDetailCard country={this.state.country}/>
        <Card flexDirection={'row'} style={styles.trackCard} padding={20} margin={10}>
          <Text flex text60BO>⭐️  Track</Text>
          <Switch
            testID={'tracking_switch'}
            value={this.state.track}
            onValueChange={this.onValueChange}/>
        </Card>
        <Card padding={20} margin={10} flexDirection={'column'}>
          <View>
            <Text text60M style={styles.cardTitle}>🗓️  Recent data</Text>
          </View>
          <View>
            <CasesChangeGraph labels={this.state.labels} data={this.state.data}/>
          </View>
        </Card>
      </ScrollView>
    )
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

const styles = StyleSheet.create({
  trackCard: {
    alignSelf: 'stretch'
  },
  cardTitle: {
    marginBottom: 30
  }
})
