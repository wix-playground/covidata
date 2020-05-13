// In index.js of a new project
const { Navigation } = require('react-native-navigation');
const React = require('react');
const { View, Text, Button, StyleSheet } = require('react-native');


// Settings screen declaration - this is the screen we'll be pushing into the stack
const SettingsScreen = () => {
  return (
    <View style={[styles.root, styles.settings]}>
      <Text>Settings Screen</Text>
    </View>
  );
};

// Home screen declaration
const HomeScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation 👋</Text>
      <Button
        title='Push Settings Screen'
        color='#710ce3'
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Settings',
            options: {
              topBar: {
                title: {
                  text: 'Settings'
                }
              }
            }
          }
        })}/>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    }
  }
};

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: '#4d089a'
      }
    }
  });
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});