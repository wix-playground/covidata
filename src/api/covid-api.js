import {COVID_API_URL} from '../../env';
import {Api} from './common';

export class CovidApi {
  static async getSummary() {
    return Api.fetchJson(`${COVID_API_URL}/summary`).then((json) =>
      this.extractCountries(json),
    );
  }

  static async getCountryStats(countrySlug) {
    return await Api.fetchJson(
      `${COVID_API_URL}/total/dayone/country/${countrySlug}`,
    ).then((json) => this.extractCountryDataPoints(json));
  }

  static extractCountryDataPoints(json) {
    const labels = [];
    const data = [];
    for (const dataPoint of json) {
      const date = new Date(Date.parse(dataPoint.Date));
      labels.push(`${date.getDate()}/${+date.getMonth() + 1}`);
      data.push(dataPoint.Confirmed);
    }
    return {labels, data};
  }

  static extractCountries(json) {
    const countries = json.Countries;
    const globalData = json.Global;
    return {countries, globalData};
  }
}
