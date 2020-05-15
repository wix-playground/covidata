import React, {Component} from 'react';
import {Badge, Text, View} from 'react-native-ui-lib';
import {API_ROOT} from '../../index';
import {CountrySummary} from '../utils/CountrySummary';
import {CountryDetailCard} from '../components/CountryDetailDashboard';

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalData: 
        new CountrySummary('','','','','','','','',''),
    };
  }

  componentDidMount() {
    this.updateGlobal();
  }

  render() {
    return (
      <View flex padding-page>
        <CountryDetailCard country={this.state.globalData}/>
      </View>
    );
  }

  updateGlobal() {
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        let data = json['Global'];
        let globalData = (
          new CountrySummary(
            'Global',
            '',
            '',
            data['TotalConfirmed'],
            data['NewConfirmed'],
            data['NewDeaths'],
            data['TotalDeaths'],
            data['NewRecovered'],
            data['TotalRecovered'])
        );
        this.setState({globalData: globalData});
      })
      .catch(error => console.error(error));
  }
}

const StatViewRow = (props) => {
  return (
    <View padding={10} flexDirection={'row'}>
      <Text flex-1>{props.statLabel}</Text>
      <Text>{props.activeTotal}</Text>
      <Badge label={props.activeNew} backgroundColor={'red'}/>
    </View>
  );
};


HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};