import React, {Component} from 'react';
import {View, Text, Card, Switch} from 'react-native-ui-lib';
import {CountryDetailCard, CasesChangeGraph} from '../components/CountryDetailDashboard';
import {API_ROOT} from '../../index';
import {ScrollView} from 'react-native';

export class CountryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country,
      labels: [],
      data: [0],
    }
  }
  componentDidMount() {
    this.getCountryDetail();
  }
  render() {
    return (
      <ScrollView flex>
        <CountryDetailCard country={this.state.country}/>
        <Card flexDirection={'row'} style={{alignSelf: 'stretch'}} padding={20} margin={10}>
          <Text flex text60BO>⭐️  Track</Text>
          <Switch offColor={'red'} onColor={'green'} disabled={true}/>
        </Card>
        <Card padding={20} margin={10} flexDirection={'column'}>
          <View>
            <Text text60M style={{marginBottom: 30}}>🗓️  Recent data</Text>
          </View>
          <View>
            <CasesChangeGraph labels={this.state.labels} data={this.state.data}/>
          </View>
        </Card>
      </ScrollView>
    )
  }

  async getCountryDetail() {
    let labels = [];
    let data = [];
    await fetch(`${API_ROOT}/live/country/${this.state.country.slug}`)
      .then(response => response.json())
      .then(json => {
        for (let dataPoint of json) {
          let date = new Date(Date.parse(dataPoint["Date"]));
          labels.push(`${date.getDate()}/${date.getMonth()}`);
          data.push(dataPoint["Confirmed"]);
        }
        this.setState({labels: labels, data: data});
      })
      .catch(error => console.error(error));
  }


}


