import { CountryDetailCard } from '../components/country-detail-card';
const { toJSON, renderComponent, filterByTestID } = require('react-component-driver')

it('correctly passes data and constructs the necessary views', () => {
  const country = {
    name: 'Lithuania',
    countryCode: 'LT',
    slug: 'lithuania',
    totalConfirmed: 1,
    newConfirmed: 2,
    totalDeaths: 3,
    newDeaths: 4,
    totalRecovered: 5,
    newRecovered: 6
  }
  expect(filterByTestID('country_name_lithuania', toJSON(renderComponent(CountryDetailCard, { country })))[0].children[0])
    .toEqual('🇱🇹 Lithuania')
  expect(filterByTestID('lithuania_Confirmed_total', toJSON(renderComponent(CountryDetailCard, { country })))[0].children[0])
    .toEqual('1')
  expect(filterByTestID('lithuania_Confirmed_new', toJSON(renderComponent(CountryDetailCard, { country })))[0].props.label)
    .toEqual('+2')
  expect(filterByTestID('lithuania_Deaths_total', toJSON(renderComponent(CountryDetailCard, { country })))[0].children[0])
    .toEqual('3')
  expect(filterByTestID('lithuania_Deaths_new', toJSON(renderComponent(CountryDetailCard, { country })))[0].props.label)
    .toEqual('+4')
  expect(filterByTestID('lithuania_Recoveries_total', toJSON(renderComponent(CountryDetailCard, { country })))[0].children[0])
    .toEqual('5')
  expect(filterByTestID('lithuania_Recoveries_new', toJSON(renderComponent(CountryDetailCard, { country })))[0].props.label)
    .toEqual('+6')
})
