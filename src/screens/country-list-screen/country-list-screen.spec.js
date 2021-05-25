import {CountryListScreenDriver} from './country-list-screen.driver';
import {CovidApi} from '../../api/covid-api';

const countries = [
  {
    country: 'Lithuania',
    countryCode: 'LT',
    slug: 'lithuania',
    newConfirmed: 15,
    totalConfirmed: 1562,
    newDeaths: 1,
    totalDeaths: 60,
    newRecovered: 28,
    totalRecovered: 1025,
    date: '2020-05-20T09:10:49Z',
  },
  {
    country: 'Afghanistan',
    countryCode: 'AF',
    slug: 'afghanistan',
    newConfirmed: 581,
    totalConfirmed: 7653,
    newDeaths: 5,
    totalDeaths: 178,
    newRecovered: 49,
    totalRecovered: 850,
    date: '2020-05-20T09:10:49Z',
  },
];

CovidApi.getSummary = jest.fn().mockResolvedValue({globalData: {}, countries});

describe('Country list screen', () => {
  let driver;

  beforeEach(async () => {
    driver = new CountryListScreenDriver();
    driver.setProps({countries});
    await driver.renderAsync();
  });

  it('should create a list of countries on fetch', async () => {
    const countrySlug = 'afghanistan';

    const renderedCountries = driver.getRenderedCountries();

    // test fixture length must be under 10, otherwise full render might not happen
    expect(renderedCountries.length).toEqual(renderedCountries.length);

    expect(driver.containsCountry(renderedCountries, countrySlug)).toBeTruthy();
    expect(driver.containsText(renderedCountries, '🇦🇫')).toBeTruthy();
    expect(driver.containsText(renderedCountries, 'Afghanistan')).toBeTruthy();
    expect(driver.containsText(renderedCountries, '7,653')).toBeTruthy();
  });

  it('should open the country detail page on flat list item press', async () => {
    const countrySlug = 'afghanistan';

    const countryData = driver.getCountryData(countrySlug);
    driver.tapCountry(countrySlug);

    expect(driver.openedCountryScreenWith(countryData)).toBeTruthy();
  });
});
