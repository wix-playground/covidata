import { ConditionalBadge } from '../components/conditional-badge'
import { getBadgeColor } from '../utils/helper-methods'
const { toJSON, renderComponent } = require('react-component-driver')

describe('ConditionalBadge style application', () => {
  it('should be coloured and have + prepended to the label', () => {
    const json = toJSON(renderComponent(ConditionalBadge, { new_confirmed: '1', testID: 'cond' }))
    expect(json.props.backgroundColor).toEqual('red')
    expect(json.props.label).toEqual('+1')
  })
})

describe('BackgroundColor logic', () => {
  it('should return "green" for 0 deaths/cases OR > 0 recoveries', () => {
    expect(getBadgeColor(0)).toEqual('green')
    expect(getBadgeColor(10, true)).toEqual('green')
  })

  it('should return "red" ("orange") for > 0 deaths/cases (0 recoveries)', () => {
    expect(getBadgeColor(1)).toEqual('red')
    expect(getBadgeColor(0, true)).toEqual('orange')
  })
})
