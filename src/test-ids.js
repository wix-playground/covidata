export const GET_COUNTRY_NAME = (slug) => `country_name_${slug || 'global'}`;
export const GET_COUNTRY_SLUG = (slug) => `${slug || 'global'}`;
export const TRACKING_SWITCH = 'tracking_switch';
export const FLAT_COUNTRY_LIST = 'flat_country_list';
export const FLAT_NEWS_ARTICLE_LIST = 'flat_news_article_list';
export const ARTICLE_ROW = 'article_row';
export const ARTICLE_IMAGE = 'article_image';
export const ARTICLE_SOURCE = 'article_source';
export const ARTICLE_TITLE = 'article_title';
export const ARTICLE_TIMESTAMP = 'article_timestamp';
export const GET_COUNTRY_ROW = (slug) => `${slug || 'global'}_row`;
export const GET_STAT_PREFIX_NAME = (prefix, name) => `${prefix}_${name}`;
export const GET_STAT_PREFIX_NAME_TOTAL = (prefix, name) =>
  `${prefix}_${name}_total`;
export const GET_STAT_PREFIX_NAME_NEW = (prefix, name) =>
  `${prefix}_${name}_new`;
export const COUNTRIES_TAB_BUTTON = 'countries_tab_button';
export const HOME_TAB_BUTTON = 'home_tab_button';
export const NEWS_FEED_TAB_BUTTON = 'news_feed_tab_button';
export const HOME_TRACKED_LIST = 'tracked_list';
