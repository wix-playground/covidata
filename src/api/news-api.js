import Api from './common'
import { NEWS_API_KEY, NEWS_API_ROOT } from '../../env'
import { COVID } from '../strings'

export default class newsApi {
  static async getTopCovidHeadlines () {
    return await this.getTopHeadlines(COVID)
  }

  static async getTopHeadlines (query) {
    return Api
      .fetchJson(`${NEWS_API_ROOT}/top-headlines?q=${escape(query)}&apiKey=${NEWS_API_KEY}`)
      .then(json => { return { articles: this.parseTopHeadlines(json) } })
  }

  static parseTopHeadlines (json) {
    if (json.status === 'ok') { return json.articles } else { throw Error(`${json.code}: ${json.message}`) }
  }
}
