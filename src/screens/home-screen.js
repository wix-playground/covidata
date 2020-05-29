import React from 'react'
import HomeScreenComp from '../components/home-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchSummaryAction } from '../redux/actions'

export class HomeScreen extends React.Component {
  componentDidMount () {
    this.props.fetchSummaryAction()
  }

  render () {
    return (<HomeScreenComp/>)
  }
}

HomeScreen.propTypes = {
  fetchSummaryAction: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSummaryAction: fetchSummaryAction
}, dispatch)

export default connect(null, mapDispatchToProps)(HomeScreen)
