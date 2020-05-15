export class CountrySummary {
  constructor(
    name,
    slug,
    country_code,
    total_confirmed,
    new_confirmed,
    new_deaths,
    total_deaths,
    new_recovered,
    total_recovered,
  ) {
    this.name = name;
    this.slug = slug;
    this.country_code = country_code;
    this.total_confirmed = total_confirmed;
    this.new_confirmed = new_confirmed;
    this.new_deaths = new_deaths;
    this.total_deaths = total_deaths;
    this.new_recovered = new_recovered;
    this.total_recovered = total_recovered;
  }
}