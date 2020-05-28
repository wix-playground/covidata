import { API_ROOT } from '../../env'
import { fetchCountryDataSuccess, fetchFailure } from '../redux/actions'

export const fetchCountryData = (countrySlug) => {
  return dispatch => {
    fetch(`${API_ROOT}/total/dayone/country/${countrySlug}`)
      .then(response => response.json())
      .then(json => {
        const labels = []
        const data = []
        for (const dataPoint of json) {
          const date = new Date(Date.parse(dataPoint.Date))
          labels.push(`${date.getDate()}/${+date.getMonth() + 1}`)
          data.push(dataPoint.Confirmed)
        }
        dispatch(fetchCountryDataSuccess(labels, data))
        return { labels, data }
      })
      .catch(error => {
        dispatch(fetchFailure(error))
      })
  }
}
