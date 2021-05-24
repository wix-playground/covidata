import {ListItem, View, Text, AnimatedImage, Assets} from 'react-native-ui-lib';
import React from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import {
  ARTICLE_IMAGE,
  ARTICLE_ROW,
  ARTICLE_SOURCE,
  ARTICLE_TIMESTAMP,
  ARTICLE_TITLE,
} from '../../test-ids';
import {Article} from '../../types';
import dateFormat from 'dateformat';

interface ArticleRowProps {
  article: Article;
}

export const ArticleRow: React.FC<ArticleRowProps> = React.memo(
  function ArticleRow({article}) {
    const onPress = () => {
      if (article.url) {
        return Linking.openURL(article.url);
      }
    };

    return (
      <ListItem margin-15 center onPress={onPress} testID={ARTICLE_ROW}>
        <View flex row>
          <AnimatedImage
            source={
              article.urlToImage ? {uri: article.urlToImage} : Assets.icons.x
            }
            loader={<ActivityIndicator />}
            style={{width: 70, height: 70, borderRadius: 10}}
            testID={ARTICLE_IMAGE}
          />
          <View marginL-15 marginB-15 flex>
            <Text uppercase text90H testID={ARTICLE_SOURCE}>
              {article.source ? article.source.name : null}
            </Text>
            <Text text80L marginV-10 numberOfLines={1} testID={ARTICLE_TITLE}>
              {article.title}
            </Text>
            <Text text100R testID={ARTICLE_TIMESTAMP}>
              {dateFormat(article.publishedAt)}
            </Text>
          </View>
        </View>
      </ListItem>
    );
  },
);
