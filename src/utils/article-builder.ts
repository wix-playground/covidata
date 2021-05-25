import Chance from 'chance';
import {Article} from '../types';

const chance = Chance();

export const buildArticle = (props: Partial<Article> = {}) => {
  const article: Article = {
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
