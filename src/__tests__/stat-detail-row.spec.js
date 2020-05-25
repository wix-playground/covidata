import { StatDetailRow } from '../components/stat-detail-row'
const { toJSON, renderComponent, filterByTestID } = require('react-component-driver')

describe('Tests for a single statistics row', () => {
  it('should display the stat name, comma-separated value, new case badge', () => {
    const statName = 'name'
    const statTotal = 1234
    const statNew = 4321
    const testIDPrefix = 'test'
    const json = toJSON(renderComponent(StatDetailRow, {
      stat_name: statName,
      stat_total: statTotal,
      stat_new: statNew,
      testID_prefix: testIDPrefix
    }))
    expect(filterByTestID('test_name', json)[0].children[0]).toEqual(statName)
    expect(filterByTestID('test_name_total', json)[0].children[0]).toEqual(statTotal.toLocaleString())
    expect(filterByTestID('test_name_new', json)[0].props.label).toEqual('+' + statNew)
  })
})
