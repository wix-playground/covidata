import React from 'react'
import HomeScreenComp from '../components/home-screen-comp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchSummaryAction } from '../redux/actions'
import { LoaderScreen } from 'react-native-ui-lib'

export class HomeScreen extends React.Component {
  componentDidMount () {
    this.props.fetchSummaryAction()
  }

  render () {
    return (this.props.pending
      ? <LoaderScreen overlay/>
      : <HomeScreenComp/>
    )
  }
}

HomeScreen.propTypes = {
  fetchSummaryAction: PropTypes.func,
  pending: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    pending: state.pending
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSummaryAction: fetchSummaryAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
