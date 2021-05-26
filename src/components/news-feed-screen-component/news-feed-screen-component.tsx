import {FlatList} from 'react-native';
import {View} from '@wix/wix-react-native-ui-lib';
import React from 'react';
import {FLAT_NEWS_ARTICLE_LIST} from '../../test-ids';
import {Article} from '../../types';

interface NewsFeedScreenComponentProps {
  articles: Article[];
  renderItem: ({item}: {item: Article}) => JSX.Element;
}

export const NewsFeedScreenComponent: React.FC<NewsFeedScreenComponentProps> =
  React.memo(function NewsFeedScreenComponent({articles, renderItem}) {
    return (
      <FlatList
        testID={FLAT_NEWS_ARTICLE_LIST}
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={separator}
      />
    );
  });

const keyExtractor = (item: Article, index: number) => {
  return index.toString();
};

const separator = () => {
  return <View marginV-10 background-grey50 height={1} />;
};
