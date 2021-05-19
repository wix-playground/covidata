import { ListItem, View, Text, AnimatedImage, Assets } from 'react-native-ui-lib'
import React from 'react'
import { ActivityIndicator, Linking } from 'react-native'
import { articlePropTypes } from '../prop-types'
import {
  TEST_ID_ARTICLE_IMAGE,
  TEST_ID_ARTICLE_ROW, TEST_ID_ARTICLE_SOURCE,
  TEST_ID_ARTICLE_TIMESTAMP,
  TEST_ID_ARTICLE_TITLE
} from '../test-ids'

const dateFormat = require('dateformat')

export const ArticleRow = React.memo(function ArticleRow ({ article }) {
  return (
    <ListItem margin-15 center onPress={ () => Linking.openURL(article.url) } testID={TEST_ID_ARTICLE_ROW}>
      <View flex flexDirection={'row'}>
        <AnimatedImage
          source={article.urlToImage ? { uri: article.urlToImage } : Assets.icons.x}
          loader={<ActivityIndicator />}
          style={{ width: 70, height: 70, borderRadius: 10 }}
          testID={TEST_ID_ARTICLE_IMAGE}
        />
        <View marginL-15 marginB-15 flex flexDirection={'column'} >
          <Text uppercase text90H testID={TEST_ID_ARTICLE_SOURCE}>{ article.source.name }</Text>
          <Text text80L marginV-10 numberOfLines={1} testID={TEST_ID_ARTICLE_TITLE}>{ article.title }</Text>
          <Text text100R testID={TEST_ID_ARTICLE_TIMESTAMP}>{ dateFormat(article.publishedAt) }</Text>
        </View>
      </View>
    </ListItem>
  )
})

ArticleRow.propTypes = {
  article: articlePropTypes
}
