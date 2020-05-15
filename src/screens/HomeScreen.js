import React, {Component} from 'react';
import {Badge, Text, View} from 'react-native-ui-lib';

export class HomeScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <View>
          <Text marginB-s4 marginT-s4>🌍 Global</Text>
          <StatViewRow statLabel={'☣️ ACTIVE'} activeTotal={'789K'} activeNew={'+20K'}/>
          <StatViewRow statLabel={'🏥 RECOVERED'} activeTotal={'789K'} activeNew={'+20K'}/>
          <StatViewRow statLabel={'😵 DEAD'} activeTotal={'789K'} activeNew={'+20K'}/>
        </View>
      </View>
    );
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