import { ListItem, View, Text, AnimatedImage, Assets } from 'react-native-ui-lib'
import React from 'react'
import { ActivityIndicator, Linking } from 'react-native'
import { articlePropTypes } from '../prop-types'

const dateFormat = require('dateformat')

export const ArticleRow = React.memo(function ArticleRow ({ article }) {
  return (
    <ListItem margin-15 center onPress={ () => Linking.openURL(article.url) }>
      <View flex flexDirection={'row'}>
        <AnimatedImage
          source={article.urlToImage ? { uri: article.urlToImage } : Assets.icons.x}
          loader={<ActivityIndicator />}
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
        <View marginL-15 marginB-15 flex flexDirection={'column'} >
          <Text uppercase text90H>{ article.source.name }</Text>
          <Text text80L marginV-10 numberOfLines={1}>{ article.title }</Text>
          <Text text100R>{ dateFormat(article.publishedAt) }</Text>
        </View>
      </View>
    </ListItem>
  )
})

ArticleRow.propTypes = {
  article: articlePropTypes
}
