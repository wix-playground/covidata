import { CountryDetailCard } from '../components/country-detail-card'
import { StatDetailRow } from '../components/stat-detail-row'
import { ConditionalBadge } from '../components/conditional-badge'
import {
  TEST_ID_COUNTRY_NAME,
  TEST_ID_STAT_PREFIX_NAME,
  TEST_ID_STAT_PREFIX_NAME_NEW,
  TEST_ID_STAT_PREFIX_NAME_TOTAL
} from '../test-ids'
import { CONFIRMED, DEATHS, RECOVERIES } from '../strings'

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

    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME(testIDPrefix, statName), row)[0].children[0]).toEqual(statName)
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_TOTAL(testIDPrefix, statName), row)[0].children[0]).toEqual(statTotal.toLocaleString())
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_NEW(testIDPrefix, statName), row)[0].props.label).toEqual('+' + statNew)
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

    expect(filterByTestID(TEST_ID_COUNTRY_NAME(country.Slug), card)[0].children[0]).toEqual('🇱🇹 Lithuania')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_TOTAL(country.Slug, CONFIRMED), card)[0].children[0]).toEqual('1')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_NEW(country.Slug, CONFIRMED), card)[0].props.label).toEqual('+2')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_TOTAL(country.Slug, DEATHS), card)[0].children[0]).toEqual('3')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_NEW(country.Slug, DEATHS), card)[0].props.label).toEqual('+4')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_TOTAL(country.Slug, RECOVERIES), card)[0].children[0]).toEqual('5')
    expect(filterByTestID(TEST_ID_STAT_PREFIX_NAME_NEW(country.Slug, RECOVERIES), card)[0].props.label).toEqual('+6')
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
