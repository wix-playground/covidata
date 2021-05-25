import {newsFeedScreenDriver} from './news-feed-screen.driver';
import {Linking} from 'react-native';
import {UNKNOWN} from '../../strings';
import dateFormat from 'dateformat';
import Chance from 'chance';

const chance = Chance();

describe('News Feed Screen', () => {
  let driver;

  beforeEach(() => {
    driver = newsFeedScreenDriver();
  });

  const defaultProps = {
    fetchCovidNewsAction: () => {},
    articles: [],
  };

  it('renders an empty container when articles could not be fetched', () => {
    driver.setProps(defaultProps);

    expect(driver.container()).toBeDefined();
    expect(driver.articles().length).toEqual(0);
  });

  it('renders a single article along with all data associated correctly', () => {
    const article = buildArticle();
    const articles = [article];
    const expectedTitle = article.title;
    const expectedSourceName = article.source.name;
    const expectedDate = dateFormat(article.publishedAt);
    const expectedImageUrl = article.urlToImage ?? undefined;
    driver.setProps({...defaultProps, articles});

    expect(driver.articles().length).toEqual(1);
    expect(driver.articleAtIndex(0).title()).toEqual(expectedTitle);
    expect(driver.articleAtIndex(0).sourceName()).toEqual(expectedSourceName);
    expect(driver.articleAtIndex(0).timestamp()).toEqual(expectedDate);
    expect(driver.articleAtIndex(0).imageUri()).toEqual(expectedImageUrl);
  });

  it('renders multiple different articles retrieved in order', () => {
    const articles = Array.from(
      {length: chance.natural({min: 2, max: 10})},
      () => buildArticle(),
    );
    driver.setProps({...defaultProps, articles});

    expect(driver.articles().length).toEqual(articles.length);
    expect(driver.articleAtIndex(0).title()).toEqual(articles[0].title);
    expect(driver.articleAtIndex(1).title()).toEqual(articles[1].title);
    expect(driver.articleAtIndex(0).title()).not.toEqual(
      driver.articleAtIndex(1).title(),
    );
  });

  it('renders an article with fallbacks if properties not present', () => {
    const articles = [buildArticle({source: null, urlToImage: null})];
    driver.setProps({...defaultProps, articles});

    expect(driver.articleAtIndex(0).sourceName()).toEqual(UNKNOWN);
    expect(driver.articleAtIndex(0).imageUri()).toEqual(undefined);
  });

  describe('article URL on press', () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');

    beforeEach(() => {
      openURLSpy.mockClear();
    });

    it('should open the article URL on tap', () => {
      const articles = [buildArticle()];
      driver.setProps({...defaultProps, articles});
      driver.articleAtIndex(0).tap();

      expect(openURLSpy).toHaveBeenCalledWith(articles[0].url);
    });

    it('should not call openURL if no URL is given', () => {
      const articles = [buildArticle({url: null})];
      driver.setProps({...defaultProps, articles});
      driver.articleAtIndex(0).tap();

      expect(openURLSpy).not.toHaveBeenCalled();
    });
  });
});

const buildArticle = (props = {}) => {
  const article = {
    source: {
      id: chance.guid(),
      name: chance.company(),
    },
    author: chance.name(),
    title: chance.sentence(),
    description: chance.sentence(),
    url: chance.url(),
    urlToImage: chance.url(),
    publishedAt: chance.date().toISOString(),
    content: chance.sentence(),
  };

  return {
    ...article,
    ...props,
  };
};
