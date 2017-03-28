var urlSrc = '';
var body = document.getElementsByTagName('body')[0];
var script = document.createElement('script');
if (Meteor.settings.public.GOOGLE_MAP_REGION === 'cn') {
  urlSrc = 'http://maps.google.cn/maps/api/js?key=' + Meteor.settings.public.GOOGLE_MAP_KEY;
} else {
  urlSrc = 'https://maps.googleapis.com/maps/api/js?key=' + Meteor.settings.public.GOOGLE_MAP_KEY;
}
script.src = urlSrc;
body.appendChild(script);