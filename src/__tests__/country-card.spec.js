import { CountryDetailCard } from '../components/country-detail-card'
import { StatDetailRow } from '../components/stat-detail-row'
import { ConditionalBadge } from '../components/conditional-badge'

const { toJSON, renderComponent, filterByTestID } = require('react-component-driver')

describe('tests for the country card views', () => {
  it('should display the stat name, comma-separated value, new case badge in a single stat row', () => {
    const statName = 'name'
    const statTotal = 1234
    const statNew = 4321
    const testIDPrefix = 'test'
    const row = toJSON(renderComponent(StatDetailRow, {
      stat_name: statName,
      stat_total: statTotal,
      stat_new: statNew,
      testID_prefix: testIDPrefix
    }))

    expect(filterByTestID('test_name', row)[0].children[0]).toEqual(statName)
    expect(filterByTestID('test_name_total', row)[0].children[0]).toEqual(statTotal.toLocaleString())
    expect(filterByTestID('test_name_new', row)[0].props.label).toEqual('+' + statNew)
  })

  it('correctly passes data to a card and constructs the necessary views', () => {
    const country = {
      Country: 'Lithuania',
      CountryCode: 'LT',
      Slug: 'lithuania',
      TotalConfirmed: 1,
      NewConfirmed: 2,
      TotalDeaths: 3,
      NewDeaths: 4,
      TotalRecovered: 5,
      NewRecovered: 6
    }

    const card = toJSON(renderComponent(CountryDetailCard, { country }))

    expect(filterByTestID('country_name_lithuania', card)[0].children[0]).toEqual('🇱🇹 Lithuania')
    expect(filterByTestID('lithuania_Confirmed_total', card)[0].children[0]).toEqual('1')
    expect(filterByTestID('lithuania_Confirmed_new', card)[0].props.label).toEqual('+2')
    expect(filterByTestID('lithuania_Deaths_total', card)[0].children[0]).toEqual('3')
    expect(filterByTestID('lithuania_Deaths_new', card)[0].props.label).toEqual('+4')
    expect(filterByTestID('lithuania_Recoveries_total', card)[0].children[0]).toEqual('5')
    expect(filterByTestID('lithuania_Recoveries_new', card)[0].props.label).toEqual('+6')
  })

  it('ConditionalBadge should be coloured and have + prepended to the label', () => {
    const json = toJSON(renderComponent(ConditionalBadge, { newConfirmed: 1, testID: 'cond' }))

    expect(json.props.backgroundColor).toEqual('red')
    expect(json.props.label).toEqual('+1')

    const json2 = toJSON(renderComponent(ConditionalBadge, { newConfirmed: 0, testID: 'cond' }))

    expect(json2.props.backgroundColor).toEqual('green')
    expect(json2.props.label).toEqual('+0')

    const json3 = toJSON(renderComponent(ConditionalBadge, { newConfirmed: 0, testID: 'cond', recoveries: true }))

    expect(json3.props.backgroundColor).toEqual('orange')
    expect(json3.props.label).toEqual('+0')
  })
})
