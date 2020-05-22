import {ConditionalBadge} from '../components/ConditionalBadge';
import React from 'react';
const {toJSON, renderComponent, filterByTestID} = require('react-component-driver');

// describe('ConditionalBadge style application', () => {
//   it('should become red(green) when deaths/cases(recoveries) are above 0', () => {
//     const json1 = toJSON(renderComponent(ConditionalBadge, {new_confirmed: '1', testID: 'cond'}));
//     //expect(filterByTestID('cond', json1)[0].props.style[7][3].backgroundColor).toEqual("red");
//     //const json2 = toJSON(renderComponent(ConditionalBadge, {new_confirmed: '1', testID: 'cond', recoveries: true}));
//     //expect(filterByTestID('cond', json2)[0].props.style[7][3].backgroundColor).toEqual("green");
//   });
//   it('should become green(orange) when deaths/cases(recoveries) are 0', () => {
//     const json1 = toJSON(renderComponent(ConditionalBadge, {new_confirmed: '0', testID: 'cond'}));
//     expect(filterByTestID('cond', json1)[0].props.style[7][3].backgroundColor).toEqual("green");
//     const json2 = toJSON(renderComponent(ConditionalBadge, {new_confirmed: '0', testID: 'cond', recoveries: true}));
//     expect(filterByTestID('cond', json2)[0].props.style[7][3].backgroundColor).toEqual("orange");
//   });
// });

describe('ConditionalBadge backgroundColor logic', () => {
  it('should return "green" for 0 deaths/cases or > 0 recoveries', () => {
    const conditionalBadge = new ConditionalBadge();
    expect(conditionalBadge.getBadgeColor(0)).toEqual("green");
    expect(conditionalBadge.getBadgeColor(10, true)).toEqual("green");
  });
  it('should return "red" ("orange") for > 0 deaths/cases (0 recoveries)', () => {
    const conditionalBadge = new ConditionalBadge();
    expect(conditionalBadge.getBadgeColor(1)).toEqual("red");
    expect(conditionalBadge.getBadgeColor(0, true)).toEqual("orange");
  });
});