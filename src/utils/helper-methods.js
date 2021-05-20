import React from 'react';

const emoji = require('country-to-emoji-flag');

export function sliceToNLast(data, n) {
  return data ? data.slice(Math.max(data.length - n, 0)) : [];
}

export function getBadgeColor(number, recoveries = false) {
  return recoveries
    ? number > 0
      ? 'green'
      : 'orange'
    : number > 0
    ? 'red'
    : 'green';
}

export function tryEmoji(code) {
  try {
    return emoji(code);
  } catch (e) {
    return '🌍';
  }
}

export function wrapWithProvider(Component, Provider, store, props = {}) {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export function computeNewTrackedCountries(tracked, countrySlug, value) {
  return value
    ? [...tracked, countrySlug]
    : tracked.filter((elem) => elem !== countrySlug);
}
