import Chance from 'chance';

const chance = Chance();

export const buildArticle = (props = {}) => {
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
