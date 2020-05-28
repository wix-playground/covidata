import PropTypes from 'prop-types'

export const countryPropTypes = PropTypes.shape({
  Country: PropTypes.string,
  CountryCode: PropTypes.string,
  Slug: PropTypes.string,
  NewConfirmed: PropTypes.number,
  TotalConfirmed: PropTypes.number,
  NewDeaths: PropTypes.number,
  TotalDeaths: PropTypes.number,
  NewRecovered: PropTypes.number,
  TotalRecovered: PropTypes.number,
  Date: PropTypes.string
})

export const globalDataPropTypes = PropTypes.shape({
  NewConfirmed: PropTypes.number,
  TotalConfirmed: PropTypes.number,
  NewDeaths: PropTypes.number,
  TotalDeaths: PropTypes.number,
  NewRecovered: PropTypes.number,
  TotalRecovered: PropTypes.number
})
