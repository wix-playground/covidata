import { COUNTRIES_UPDATED } from './constants'

export const updateCountries = (countries, globalData) => {
  return {
    type: COUNTRIES_UPDATED,
    payload: {
      countries: countries,
      globalData: globalData
    }
  }
}
