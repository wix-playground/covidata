import { createComponentDriver } from './base-component-driver'
import { articleRowDriver } from './article-row-driver'
import { TEST_ID_ARTICLE_ROW, TEST_ID_FLAT_NEWS_ARTICLE_LIST } from '../../test-ids'
import { NewsFeedScreen } from '../../screens/news-feed-screen'

export const newsFeedScreenDriver = () => {
  return createComponentDriver(NewsFeedScreen, {
    container () {
      return this.getByID(TEST_ID_FLAT_NEWS_ARTICLE_LIST)
    },
    articleAtIndex (index: number) {
      return articleRowDriver().attachTo(this.filterByID(TEST_ID_ARTICLE_ROW)[index])
    }
  })
}
