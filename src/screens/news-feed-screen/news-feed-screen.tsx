import React from 'react';
import {NewsFeedScreenComponent} from '../../components/news-feed-screen-component/news-feed-screen-component';
import {ArticleRow} from '../../components/article-row/article-row';
import {fetchCovidNews} from '../../redux/actions';
import {LoaderScreen} from '@wix/wix-react-native-ui-lib';
import {Article} from '../../types';

export interface NewsFeedScreenStateProps {
  articles: Article[];
  pending: boolean;
}

export interface NewsFeedScreenDispatchProps {
  fetchCovidNewsAction: typeof fetchCovidNews;
}

export interface NewsFeedScreenProps
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
