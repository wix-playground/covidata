import {createComponentDriver} from '../../utils/base-component-driver';
import {articleRowDriver} from '../../components/article-row/article-row.driver';
import {ARTICLE_ROW, FLAT_NEWS_ARTICLE_LIST} from '../../test-ids';
import {NewsFeedScreen} from './news-feed-screen';

export const newsFeedScreenDriver = () => {
  return createComponentDriver(NewsFeedScreen, {
    container() {
      return this.getByID(FLAT_NEWS_ARTICLE_LIST);
    },
    articles() {
      return this.filterByID(ARTICLE_ROW);
    },
    articleAtIndex(index: number) {
      return articleRowDriver().attachTo(this.filterByID(ARTICLE_ROW)[index]);
    },
  });
};
