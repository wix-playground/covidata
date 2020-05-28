import { ReduxComponentDriver, getTextNodes } from 'redux-component-driver'
import HomeScreen from '../../screens/home-screen'

export class HomeScreenDriver extends ReduxComponentDriver {
  constructor (store) {
    super(HomeScreen, store)
  }

  containsText (text) {
    return getTextNodes(this.getComponent()).includes(text)
  }
}
