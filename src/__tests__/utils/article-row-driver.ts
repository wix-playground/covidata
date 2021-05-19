import { createComponentDriver } from './base-component-driver'
import { ArticleRow } from '../../components/article-row'
import {
  TEST_ID_ARTICLE_IMAGE,
  TEST_ID_ARTICLE_SOURCE,
  TEST_ID_ARTICLE_TIMESTAMP,
  TEST_ID_ARTICLE_TITLE
} from '../../test-ids'

export const articleRowDriver = () => {
  return createComponentDriver(ArticleRow, {
    async tap () {
      // Not sure how to convince TS that props have onPress?
      // @ts-ignore
      await this.props.onPress()
    },
    title () {
      return this.getText(TEST_ID_ARTICLE_TITLE)
    },
    sourceName () {
      return this.getText(TEST_ID_ARTICLE_SOURCE)
    },
    timestamp () {
      return this.getText(TEST_ID_ARTICLE_TIMESTAMP)
    },
    imageUri () {
      const imageProps = this.getByID(TEST_ID_ARTICLE_IMAGE)?.props
      return imageProps?.source ? imageProps.source.uri : undefined
    }
  })
}
