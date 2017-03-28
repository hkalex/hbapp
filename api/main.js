const http = require('http');
const https = require('https');
const url = require('url');
const process = require('process');

const settings = require('./settings.json');
const googleKey = settings.GoogleKey;
const port = settings.Port || process.env.PORT || 5000;

try {
  http.createServer((req, res) => {
    res.writeHead(200);
    if (req.headers['x-hbapp-method'] === 'predictions') {
      var arg = url.parse(req.url, true).query;
      var requestUrl = encodeURI(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${arg.input}&types=geocode&language=en&components=country:au&key=${googleKey}`);
      https.get(requestUrl, (response) => {
        response.on('data', (chunk) => {
          res.write(chunk);
        });
        response.on('end', () => {
          res.end();
        });
      }).on('error', (e) => {
        console.error(e);
      });
    } else {
      res.end('{}');
    }
  }).listen(port).on('error', (err) => {
    // handle errors here
    throw err;
  });
  console.log('create server success! listen port: ' + port);
} catch (e) {
  console.log(e);
}