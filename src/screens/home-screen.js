import React from 'react'
import HomeScreenComp from '../components/home-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchSummary } from '../api/fetch-summary'

export class HomeScreen extends React.Component {
  componentDidMount () {
    this.props.fetchSummary()
  }

  render () {
    return (<HomeScreenComp/>)
  }
}

HomeScreen.propTypes = {
  fetchSummary: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSummary: fetchSummary
}, dispatch)

export default connect(null, mapDispatchToProps)(HomeScreen)
