import React from 'react';
import {connect} from 'react-redux';
import {NewsFeedScreenComp} from '../components/news-feed-screen-comp';
import {ArticleRow} from '../components/article-row';
import {fetchCovidNews} from '../redux/actions';
import {bindActionCreators, Dispatch} from 'redux';
import {LoaderScreen} from '@wix/wix-react-native-ui-lib';
import {Article, State} from '../types';

export interface NewsFeedScreenProps {
  componentId: string;
  articles: Article[];
  fetchCovidNewsAction: typeof fetchCovidNews;
  pending: boolean;
}

export class NewsFeedScreen extends React.Component<NewsFeedScreenProps> {
  constructor(props: NewsFeedScreenProps) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchCovidNewsAction();
  }

  render() {
    return this.props.pending ? (
      <LoaderScreen overlay />
    ) : (
      <NewsFeedScreenComp
        articles={this.props.articles}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem({item}: {item: Article}) {
    return <ArticleRow article={item} />;
  }
}

const mapStateToProps = (state: State) => {
  return {
    ...state,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedScreen);
