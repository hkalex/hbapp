const http = require('http');
const https = require('https');
const url = require('url');
const process = require('process');

const settings = require('./settings.json');

const googleKey = settings.GoogleKey;
const port = settings.Port || process.env.PORT || 5000;

http.createServer((req, res) => {
  if (req.headers['x-hbapp-method'] === 'predictions') {
    var arg = url.parse(req.url, true).query;
    //var requestUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${arg.input}&types=geocode&language=zh&key=${googleKey}`;
    var requestUrl = "https://www.baidu.com/";
    https.get(requestUrl, (response) => {
      response.on('data', (chunk) => {
        res.writeHead(200);
        res.write(chunk);
      });
      response.on('end', () => {
        res.end();
      });
    }).on('error', (e) => {
      res.writeHead(500);
      res.write(e);
      console.error(e);
    });
  } else {
    res.writeHead(404);
    res.end('{}');
  }

}).listen(port);

console.log(`API server is listening port ${port}`);
