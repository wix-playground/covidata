const {Navigation} = require('react-native-navigation');
import React, {Component} from 'react';

const {StyleSheet} = require('react-native');
import {View, Text, Card, Button} from 'react-native-ui-lib';


class HomeScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <Text heading marginB-s4>Hello React Native Navigation 👋</Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>This is an example card </Text>
        </Card>
        <Button
          label="Button" text70 white background-orange30
          onPress={() => Navigation.push(this.props.componentId, {
            component: {
              name: 'Settings',
            },
          })}/>
      </View>
    );
  }
}

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

const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
};
SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings',
    },
  },
  bottomTab: {
    text: 'Settings',
  },
};

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);


Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a',
    },
    topBar: {
      title: {
        color: 'white',
      },
      backButton: {
        color: 'white',
      },
      background: {
        color: '#4d089a',
      },
    },
    bottomTab: {
      fontSize: 14,
      selectedFontSize: 14,
    },
  });
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                  },
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Settings',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});