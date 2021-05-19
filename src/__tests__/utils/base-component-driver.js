import { getTextNodes, ComponentDriver } from 'react-component-driver'

class BaseDriver extends ComponentDriver {
  getText (testID) {
    const node = this.getByID(testID)
    return node ? getTextNodes(node).join('') : undefined
  }
}

const createComponentDriver = (Component, methods) => {
  return Object.assign(new BaseDriver(Component), methods)
}

export { createComponentDriver }
