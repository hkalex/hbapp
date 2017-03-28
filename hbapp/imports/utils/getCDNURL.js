import { Meteor } from 'meteor/meteor';

import path from './path';

/**
 * @description get the URL on CDN
 * @export
 * @param {any} url
 * @returns
 */
export default function getCDNURL(url) {
  if (!url) return url;

  if (path.isAbsoluteUrl(url)) return url;

  if (Meteor && Meteor.settings && Meteor.settings.public && Meteor.settings.public.CDN_URL) {
    return path.combineUrl(Meteor.settings.public.CDN_URL, url);
  } else {
    return '//SENSITY/' + url;
  }
}
