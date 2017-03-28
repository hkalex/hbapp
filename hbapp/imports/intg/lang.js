import { TAPi18n } from 'meteor/tap:i18n';
import Store from '/imports/stores/store';
import { browserHistory } from 'react-router';

/**
 * @export
 * @param {any} key
 * @param {any} options
 * @param {any} lang_tag
 */
export function lbl(key, options = {}, lang_tag) {
  lang_tag = lang_tag || TAPi18n.getLanguage();
  const langs = Store.getState().langs;
  let label = TAPi18n.__(key, options, lang_tag);

  for (let [objKey, value] of Object.entries(langs)) {
    if (value.langTag === lang_tag) {
      if (value.content[key]) {
        label = value.content[key];
      }
    }
  }
  return label;
}

export function getLanguage() {
  return TAPi18n.getLanguage();
}

/**
 * @export
 * @param {any} lang_tag
 * @returns
 */
export function setLanguage(lang_tag, options) {
  TAPi18n.setLanguage(lang_tag);
  if (typeof options === 'function') {
    options && options();
  } else if (typeof options === 'string') {
    browserHistory.push(options);
  }
}