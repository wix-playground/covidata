import {ConditionalBadge} from '../components/ConditionalBadge';
import React from 'react';
const {toJSON, renderComponent} = require('react-component-driver');

describe('ConditionalBadge style application', () => {

  it('should be coloured and have + prepended to the label', () => {
    const json = toJSON(renderComponent(ConditionalBadge, {new_confirmed: '1', testID: 'cond'}));
    expect(json.props.backgroundColor).toEqual("red");
    expect(json.props.label).toEqual("+1");
  });

});

describe('BackgroundColor logic', () => {

  const conditionalBadge = new ConditionalBadge();

  it('should return "green" for 0 deaths/cases OR > 0 recoveries', () => {
    expect(conditionalBadge.getBadgeColor(0)).toEqual("green");
    expect(conditionalBadge.getBadgeColor(10, true)).toEqual("green");
  });

  it('should return "red" ("orange") for > 0 deaths/cases (0 recoveries)', () => {
    expect(conditionalBadge.getBadgeColor(1)).toEqual("red");
    expect(conditionalBadge.getBadgeColor(0, true)).toEqual("orange");
  });

});