const {Navigation} = require('react-native-navigation');

export const pushScreen = (componentId, name, passProps) => {
  Navigation.push(componentId, {
    component: {
      name,
      passProps,
    },
  });
};
