import Api from './common';
import {NEWS_API_KEY, NEWS_API_ROOT} from '../../env';
import {NewsApiResponse} from '../types';
import {i18n} from '../../strings';

export default class NewsApi {
  static async getTopCovidHeadlines() {
    return await this.getTopHeadlines(i18n('COVID'));
  }

  static async getTopHeadlines(query: string) {
    return Api.fetchJson(
      `${NEWS_API_ROOT}/top-headlines?q=${escape(
        query,
      )}&apiKey=${NEWS_API_KEY}`,
    ).then((json) => {
      return {articles: this.parseTopHeadlines(json)};
    });
  }

  static parseTopHeadlines(json: NewsApiResponse) {
    if (json.status === 'ok') {
      return json.articles;
    } else {
      throw Error(`${json.code}: ${json.message}`);
    }
  }
}