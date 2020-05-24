export class CountrySummary {
  constructor (
    name = '',
    slug = '',
    countryCode = '',
    totalConfirmed = '',
    newConfirmed = '',
    newDeaths = '',
    totalDeaths = '',
    newRecovered = '',
    totalRecovered = ''
  ) {
    this.name = name
    this.slug = slug
    this.countryCode = countryCode
    this.totalConfirmed = totalConfirmed
    this.newConfirmed = newConfirmed
    this.newDeaths = newDeaths
    this.totalDeaths = totalDeaths
    this.newRecovered = newRecovered
    this.totalRecovered = totalRecovered
  }
}
