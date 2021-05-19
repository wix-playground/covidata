import { newsFeedScreenDriver } from './utils/news-feed-screen-driver'
import { Assets } from 'react-native-ui-lib'
import { Linking } from 'react-native'

export const article = {
  source: { id: '', name: 'ESPN' },
  author: '',
  title: 'Jayson Tatum explodes for 50 as Boston Celtics claim 7th seed in NBA playoffs - ESPN',
  description: '',
  url: 'https://www.espn.com/mlb/story/_/id/31469676/jayson-tatum-explodes-50-boston-celtics-claim-7th-seed-nba-playoffs',
  urlToImage: 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F0519%2Fr855919_1296x729_16%2D9.jpg',
  publishedAt: '2021-05-19T05:41:55Z',
  content: ''
}
const articleNoImage = { ...article, urlToImage: undefined }
const articles = [article, articleNoImage]
const formattedTimestamp = 'Wed May 19 2021 08:41:55'

Assets.icons = jest.fn().mockResolvedValue({ x: undefined })

describe('News Feed Screen', () => {
  let driver

  beforeEach(() => {
    driver = newsFeedScreenDriver()
    driver.setProps({ articles, fetchCovidNewsAction: () => {} })
  })

  it('renders the container', () => {
    expect(driver.container()).toBeDefined()
  })

  describe('Article Row', () => {
    it('should render the title and source', () => {
      expect(driver.articleAtIndex(0).title()).toEqual(article.title)
      expect(driver.articleAtIndex(0).sourceName()).toEqual(article.source.name)
    })

    it('should render the image if url is present', () => {
      expect(driver.articleAtIndex(0).imageUri()).toEqual(article.urlToImage)
    })

    it('should render a default icon if no image url given', () => {
      expect(driver.articleAtIndex(1).imageUri()).toEqual(undefined)
    })

    it('should render a formatted timestamp', () => {
      expect(driver.articleAtIndex(0).timestamp()).toEqual(formattedTimestamp)
    })

    it('should open the article URL on tap', () => {
      const spy = jest.spyOn(Linking, 'openURL')
      driver.articleAtIndex(0).tap()

      expect(spy).toHaveBeenCalledWith(article.url)
    })
  })
})
