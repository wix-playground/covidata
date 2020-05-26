import { Navigation } from 'react-native-navigation'
const { ComponentDriver } = require('react-component-driver')
const { _ } = require('lodash')

export class PushScreenDriver extends ComponentDriver {
  didPushScreenWithProps (screenName, props) {
    const pushedScreen = Navigation.push.mock.calls.pop()[1].component
    return pushedScreen.name === screenName &&
      _.isEqual(pushedScreen.passProps, props)
  }
}
