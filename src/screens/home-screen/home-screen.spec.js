import {store} from '../../redux/configure-store';
import {HomeScreenDriver} from './home-screen.driver';
import {CovidApi} from '../../api/covid-api';

const globalData = {
  newConfirmed: 96840,
  totalConfirmed: 4977471,
  newDeaths: 5089,
  totalDeaths: 329513,
  newRecovered: 52120,
  totalRecovered: 1838344,
};

CovidApi.getSummary = jest.fn().mockResolvedValue({globalData, countries: []});

describe('Home screen', () => {
  it('should store, process and display global data on fetch', async () => {
    const driver = new HomeScreenDriver(store);
    await driver.renderAsync();

    expect(driver.containsText('🌍 Global')).toBeTruthy();
    expect(driver.containsText('4,977,471')).toBeTruthy();
    expect(driver.containsText('329,513')).toBeTruthy();
    expect(driver.containsText('1,838,344')).toBeTruthy();
  });
});
