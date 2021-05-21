import {getTextNodes, ComponentDriver} from 'react-component-driver';
import React from 'react';

class BaseDriver<P> extends ComponentDriver<P> {
  getText(testID: string) {
    const node = this.getByID(testID);
    return node ? getTextNodes(node).join('') : undefined;
  }
}

const createComponentDriver = <P, M>(
  Component: React.ComponentType<P>,
  methods?: ThisType<BaseDriver<P> & M> & M,
) => {
  return Object.assign(new BaseDriver(Component), methods);
};

export {createComponentDriver};
