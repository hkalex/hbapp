import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import https from 'https';

export default function getPlaces(inputValue = '') {
  return new Promise((resolve, reject) => {
    if (Meteor.settings.public.GOOGLE_MAP_REGION === 'cn') {
      const url1 = encodeURI(`${Meteor.settings.private.HK_API_URL}?input=${inputValue}`);
      HTTP.call('get', url1, { headers: { 'x-hbapp-method': 'predictions' } }, function (error, result) {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    } else {
      const url2 = encodeURI(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=geocode&language=en&components=country:au&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`);
      https.get(url2, (response) => {
        response.on('data', (chunk) => {
          resolve(chunk);
        });
      }).on('error', (e) => {
        reject(e);
      });
    }
  });
}