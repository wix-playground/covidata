import { API_ROOT } from '../../env'
import { fetchCountryDataSuccess } from '../redux/actions'

export default class covidApi {
  static async getSummary () {
    return await fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => this.extractCountries(json))
  }

  static async getCountryStats (countrySlug) {
    return await fetch(`${API_ROOT}/total/dayone/country/${countrySlug}`)
      .then(response => response.json())
      .then(json => this.extractCountryDataPoints(json))
  }

  static extractCountryDataPoints (json) {
    const labels = []
    const data = []
    for (const dataPoint of json) {
      const date = new Date(Date.parse(dataPoint.Date))
      labels.push(`${date.getDate()}/${+date.getMonth() + 1}`)
      data.push(dataPoint.Confirmed)
    }
    return { labels, data }
  }

  static extractCountries (json) {
    const countries = json.Countries
    const globalData = json.Global
    return { countries, globalData }
  }
}
