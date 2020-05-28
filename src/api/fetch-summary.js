import { API_ROOT } from '../../env'
import { fetchFailure, fetchSummarySuccess } from '../redux/actions'

export const fetchSummary = () => {
  return dispatch => {
    fetch(`${API_ROOT}/summary`)
      .then(response => response.json())
      .then(json => {
        const { countries, globalData } = extractCountries(json)
        dispatch(fetchSummarySuccess(countries, globalData))
        return { countries, globalData }
      })
      .catch(error => {
        dispatch(fetchFailure(error))
      })
  }
}

export const extractCountries = (json) => {
  const countries = json.Countries
  const globalData = json.Global
  return { countries, globalData }
}
