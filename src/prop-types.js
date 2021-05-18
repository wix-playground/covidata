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

export const articlePropTypes = PropTypes.shape({
  source: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.string,
  content: PropTypes.string
})
