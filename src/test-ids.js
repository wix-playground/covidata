export const TEST_ID_COUNTRY_NAME = (slug) => `country_name_${slug || 'global'}`
export const TEST_ID_COUNTRY_SLUG = (slug) => `${slug || 'global'}`
export const TEST_ID_TRACKING_SWITCH = 'tracking_switch'
export const TEST_ID_FLAT_LIST = 'flat_list'
// we usually work with either indices or constand testIDs,
// because we can select elements by text in detox.
export const TEST_ID_COUNTRY_ROW = (slug) => `${slug || 'global'}_row`
// identify key stats and have static IDs for them. currently this is a combination
// of constants and ID generators. is it really necessary?
export const TEST_ID_STAT_PREFIX_NAME = (prefix, name) => `${prefix}_${name}`
export const TEST_ID_STAT_PREFIX_NAME_TOTAL = (prefix, name) => `${prefix}_${name}_total`
export const TEST_ID_STAT_PREFIX_NAME_NEW = (prefix, name) => `${prefix}_${name}_new`
export const TEST_ID_COUNTRIES_TAB_BUTTON = 'countries_tab_button'
export const TEST_ID_HOME_TAB_BUTTON = 'home_tab_button'
export const TEST_ID_HOME_TRACKED_LIST = 'tracked_list'
