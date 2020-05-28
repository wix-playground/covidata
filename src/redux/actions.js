export const FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS'
export const FETCH_COUNTRY_DATA_SUCCESS = 'FETCH_COUNTRY_DATA_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetchSummarySuccess = (countries, globalData) => {
  return {
    type: FETCH_SUMMARY_SUCCESS,
    payload: {
      countries,
      globalData
    }
  }
}

export const fetchCountryDataSuccess = (labels, data) => {
  return {
    type: FETCH_COUNTRY_DATA_SUCCESS,
    payload: {
      labels,
      data
    }
  }
}

export const fetchFailure = (error) => {
  console.log(FETCH_FAILURE)
  return {
    type: FETCH_FAILURE,
    error: error
  }
}
