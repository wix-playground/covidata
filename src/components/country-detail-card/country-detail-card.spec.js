import {CountryDetailCard} from './country-detail-card';
import {StatDetailRow} from '../stat-detail-row/stat-detail-row';
import {ConditionalBadge} from '../conditional-badge/conditional-badge';
import {
  GET_COUNTRY_NAME,
  GET_STAT_PREFIX_NAME,
  GET_STAT_PREFIX_NAME_NEW,
  GET_STAT_PREFIX_NAME_TOTAL,
} from '../../test-ids';
import {CONFIRMED, DEATHS, RECOVERIES} from '../../strings';

const {
  toJSON,
  renderComponent,
  filterByTestID,
} = require('react-component-driver');

describe('Country card views', () => {
  it('should display the stat name, comma-separated value, new case badge in a single stat row', () => {
    const statName = 'name';
    const statTotal = 1234;
    const statNew = 4321;
    const testIDPrefix = 'test';
    const row = toJSON(
      renderComponent(StatDetailRow, {
        statName: statName,
        statTotal: statTotal,
        statNew: statNew,
        testIdPrefix: testIDPrefix,
      }),
    );

    expect(
      filterByTestID(GET_STAT_PREFIX_NAME(testIDPrefix, statName), row)[0]
        .children[0],
    ).toEqual(statName);
    expect(
      filterByTestID(GET_STAT_PREFIX_NAME_TOTAL(testIDPrefix, statName), row)[0]
        .children[0],
    ).toEqual(statTotal.toLocaleString());
    expect(
      filterByTestID(GET_STAT_PREFIX_NAME_NEW(testIDPrefix, statName), row)[0]
        .props.label,
    ).toEqual('+' + statNew);
  });

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
      NewRecovered: 6,
    };

    const card = toJSON(renderComponent(CountryDetailCard, {country}));

    expect(
      filterByTestID(GET_COUNTRY_NAME(country.Slug), card)[0].children[0],
    ).toEqual('🇱🇹 Lithuania');
    expect(
      filterByTestID(
        GET_STAT_PREFIX_NAME_TOTAL(country.Slug, CONFIRMED),
        card,
      )[0].children[0],
    ).toEqual('1');
    expect(
      filterByTestID(GET_STAT_PREFIX_NAME_NEW(country.Slug, CONFIRMED), card)[0]
        .props.label,
    ).toEqual('+2');
    expect(
      filterByTestID(GET_STAT_PREFIX_NAME_TOTAL(country.Slug, DEATHS), card)[0]
        .children[0],
    ).toEqual('3');
    expect(
      filterByTestID(GET_STAT_PREFIX_NAME_NEW(country.Slug, DEATHS), card)[0]
        .props.label,
    ).toEqual('+4');
    expect(
      filterByTestID(
        GET_STAT_PREFIX_NAME_TOTAL(country.Slug, RECOVERIES),
        card,
      )[0].children[0],
    ).toEqual('5');
    expect(
      filterByTestID(
        GET_STAT_PREFIX_NAME_NEW(country.Slug, RECOVERIES),
        card,
      )[0].props.label,
    ).toEqual('+6');
  });

  describe('ConditionalBadge should be coloured and have + prepended to the label', () => {
    it('correctly chooses label and BackgroundColor as red', () => {
      const redCondJSON = toJSON(
        renderComponent(ConditionalBadge, {newConfirmed: 1, testID: 'cond'}),
      );

      expect(redCondJSON.props.backgroundColor).toEqual('red');
      expect(redCondJSON.props.label).toEqual('+1');
    });

    it('correctly chooses label and BackgroundColor as green', () => {
      const greenCondJSON = toJSON(
        renderComponent(ConditionalBadge, {newConfirmed: 0, testID: 'cond'}),
      );

      expect(greenCondJSON.props.backgroundColor).toEqual('green');
      expect(greenCondJSON.props.label).toEqual('+0');
    });

    it('correctly chooses label and BackgroundColor as orange', () => {
      const orangeCondJSON = toJSON(
        renderComponent(ConditionalBadge, {
          newConfirmed: 0,
          testID: 'cond',
          recoveries: true,
        }),
      );

      expect(orangeCondJSON.props.backgroundColor).toEqual('orange');
      expect(orangeCondJSON.props.label).toEqual('+0');
    });
  });
});
