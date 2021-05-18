import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NewsFeedScreenComp } from '../components/news-feed-screen-comp'
import { ArticleRow } from '../components/article-row'
import { fetchCovidNews } from '../redux/actions'
import { bindActionCreators } from 'redux'
import { LoaderScreen } from 'react-native-ui-lib'

export class NewsFeedScreen extends React.Component {
  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount () {
    this.props.fetchCovidNewsAction()
  }

  render () {
    return (this.props.pending
      ? <LoaderScreen overlay/>
      : <NewsFeedScreenComp
        articles={this.props.articles}
        renderItem={this.renderItem}
      />)
  }

  renderItem ({ item }) {
    return (<ArticleRow article={item}/>)
  }
}

NewsFeedScreen.propTypes = {
  componentId: PropTypes.string,
  articles: PropTypes.array,
  fetchCovidNewsAction: PropTypes.func,
  pending: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    pending: state.pending
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCovidNewsAction: fetchCovidNews
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen)
