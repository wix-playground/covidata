import React, {Component} from 'react';
import {View, Text, Card, Switch} from 'react-native-ui-lib';
import {ConditionalBadge} from './Countries';
import {API_ROOT} from './index';
import {LineChart} from "react-native-chart-kit";
import {Dimensions} from 'react-native';

const emoji = require('country-to-emoji-flag');

let NUMBER_OF_DAYS_MAX = 15;

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
      <View flex>
        <Card padding={10} margin={10} style={{alignSelf: 'stretch'}}>
          <View margin={10}>
            <Text uppercase={true} style={{fontSize: 30}}>
              {emoji(this.state.country?.country_code || "LT")} {this.state.country?.name}
            </Text>
          </View>
          <View margin={10} flexDirection={'row'}>
            <Text flex>Confirmed: {this.state.country?.total_confirmed}</Text>
            <ConditionalBadge new_confirmed={this.state.country?.new_confirmed}/>
          </View>
          <View margin={10} flexDirection={'row'}>
            <Text flex>Deaths: {this.state.country?.total_deaths}</Text>
            <ConditionalBadge new_confirmed={this.state.country?.new_deaths}/>
          </View>
          <View margin={10} flexDirection={'row'}>
            <Text flex>Recoveries: {this.state.country?.total_recovered}</Text>
            <ConditionalBadge new_confirmed={this.state.country?.new_recovered} recoveries={true}/>
          </View>
        </Card>
        <Card flexDirection={'row'} style={{alignSelf: 'stretch'}} padding={10} margin={10}>
          <Text flex>Track</Text>
          <Switch offColor={'red'} onColor={'green'} disabled={true}/>
        </Card>
        <Card center padding={10} margin={10}>
          <LineChart
            data={{
              labels: this.state.labels.slice(
                Math.max(
                  this.state.labels.length-NUMBER_OF_DAYS_MAX, 0
                )
              ),
              datasets: [{
                data:
                  this.state.data.slice(
                    Math.max(
                      this.state.data.length-NUMBER_OF_DAYS_MAX, 0
                    )
                  )
              }]}}
            width={Dimensions.get("window").width-40}
            height={300}
            center
            fromZero
            verticalLabelRotation={90}
            xLabelsOffset={3}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `#000`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </Card>
        </View>
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
          console.log(data)
        }
        this.setState({labels: labels, data: data});
      })
      .then(() => console.log())
      .catch(error => console.error(error));
  }


}
