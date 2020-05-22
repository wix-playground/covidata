import {StatDetailRow} from '../components/StatDetailRow';
import React from 'react';
const {toJSON, renderComponent, filterByTestID} = require('react-component-driver');

describe('Tests for a single statistics row', () => {

  it('should display the stat name, comma-separated value, new case badge', () => {
    const stat_name = "name";
    const stat_total = 1234;
    const stat_new = 4321;
    const testID_prefix = "test";
    const json = toJSON(renderComponent(StatDetailRow,
      {stat_name, stat_total, stat_new, testID_prefix}));
    expect(filterByTestID('test_name', json)[0].children[0]).toEqual(stat_name);
    expect(filterByTestID('test_name_total', json)[0].children[0]).toEqual(stat_total.toLocaleString());
    expect(filterByTestID('test_name_new', json)[0].props.label).toEqual('+' + stat_new);
  });
});