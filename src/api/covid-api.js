import {COVID_API_URL} from '../../env';
import {Api} from './common';
import {_} from 'lodash';

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
    const countries = json.Countries.map((key) => this.caseCountryData(key));
    const globalData = this.caseCountryData(json.Global);
    return {countries, globalData};
  }

  static caseCountryData(countryObject) {
    return Object.fromEntries(
      Object.entries(countryObject).map(([key, value]) => [
        _.camelCase(key),
        value,
      ]),
    );
  }
}
