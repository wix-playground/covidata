import React from 'react';
import {connect} from 'react-redux';
import {NewsFeedScreenComponent} from '../../components/news-feed-screen-component/news-feed-screen-component';
import {ArticleRow} from '../../components/article-row/article-row';
import {fetchCovidNews} from '../../redux/actions';
import {bindActionCreators, Dispatch} from 'redux';
import {LoaderScreen} from 'react-native-ui-lib';
import {Article, State} from '../../types';

interface NewsFeedScreenStateProps {
  articles: Article[];
  pending: boolean;
}

interface NewsFeedScreenDispatchProps {
  fetchCovidNewsAction: typeof fetchCovidNews;
}

interface NewsFeedScreenProps
  extends NewsFeedScreenDispatchProps,
    NewsFeedScreenStateProps {}

export class NewsFeedScreen extends React.PureComponent<NewsFeedScreenProps> {
  componentDidMount() {
    this.props.fetchCovidNewsAction();
  }

  render() {
    return this.props.pending ? (
      <LoaderScreen overlay />
    ) : (
      <NewsFeedScreenComponent
        articles={this.props.articles}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem = ({item}: {item: Article}) => {
    return <ArticleRow article={item} />;
  };
}

const mapStateToProps = (state: State) => {
  return {
    articles: state.articles,
    pending: state.pending,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCovidNewsAction: fetchCovidNews,
    },
    dispatch,
  );

export default connect<NewsFeedScreenStateProps, NewsFeedScreenDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(NewsFeedScreen);
