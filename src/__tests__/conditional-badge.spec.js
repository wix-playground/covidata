import { ConditionalBadge } from '../components/conditional-badge'
const { toJSON, renderComponent } = require('react-component-driver')

describe('ConditionalBadge style application', () => {
  it('should be coloured and have + prepended to the label', () => {
    const json = toJSON(renderComponent(ConditionalBadge, { newConfirmed: 1, testID: 'cond' }))
    expect(json.props.backgroundColor).toEqual('red')
    expect(json.props.label).toEqual('+1')
  })
})
