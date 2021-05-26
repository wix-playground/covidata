import {createComponentDriver} from '../../utils/base-component-driver';
import {ArticleRow} from './article-row';
import {
  ARTICLE_IMAGE,
  ARTICLE_SOURCE,
  ARTICLE_TIMESTAMP,
  ARTICLE_TITLE,
} from '../../test-ids';

export const articleRowDriver = () => {
  return createComponentDriver(ArticleRow, {
    async tap() {
      await this.props.onPress();
    },
    title() {
      return this.getText(ARTICLE_TITLE);
    },
    sourceName() {
      return this.getText(ARTICLE_SOURCE);
    },
    timestamp() {
      return this.getText(ARTICLE_TIMESTAMP);
    },
    imageUri() {
      const imageProps = this.getByID(ARTICLE_IMAGE)?.props;
      return imageProps?.source ? imageProps.source.uri : undefined;
    },
  });
};
