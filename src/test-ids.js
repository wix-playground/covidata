/*
  you can avoid explicit returns here and write
  export const TEST_ID_COUNTRY_NAME = (slug) => `country_name_${slug || 'global'}`
*/
export const TEST_ID_COUNTRY_NAME = (slug) => { return `country_name_${slug || 'global'}` }
export const TEST_ID_COUNTRY_SLUG = (slug) => { return `${slug || 'global'}` }
export const TEST_ID_TRACKING_SWITCH = 'tracking_switch'
export const TEST_ID_FLAT_LIST = 'flat_list'
export const TEST_ID_COUNTRY_ROW = (slug) => { return `${slug || 'global'}_row` }
export const TEST_ID_STAT_PREFIX_NAME = (prefix, name) => { return `${prefix}_${name}` }
export const TEST_ID_STAT_PREFIX_NAME_TOTAL = (prefix, name) => { return `${prefix}_${name}_total` }
export const TEST_ID_STAT_PREFIX_NAME_NEW = (prefix, name) => { return `${prefix}_${name}_new` }
export const TEST_ID_COUNTRIES_TAB_BUTTON = 'countries_tab_button'
export const TEST_ID_HOME_TAB_BUTTON = 'home_tab_button'
export const TEST_ID_HOME_TRACKED_LIST = 'tracked_list'
