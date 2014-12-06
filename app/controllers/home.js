var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

var twitterKey = 'fRdztvL0ZYPmAfQu04ELPH60l',
    twitterSecret = 'BI1FGLBbSPQTnVyIMMdSCiQ7yEoPKEh3ccuLCerJEt5jQQV4AD',
    token = '313617947-wjVWNEaULaMsByX8YAii49POLBUYAwr307MuqZ72',
    secret = 'HK1STLOoTd6829mDPORb2WXSTJAATzThON52RVRMVBfXg';

var OAuth = require('OAuth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterKey,
  twitterSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   host: 'localhost:9200',
  sniffOnStart: true,
  sniffInterval: 60000,
  trace: true
});

client.ping({
  requestTimeout: 1000,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = function (app) {
  app.use('/', router);
};

//creating index
client.create({
  index: 'twitter',
  type: 'tweets',
  id: 1,
  body: {}
}, function (error, response) {
  console.log(error);
console.log('create response: ' + response);
});

oauth.get('https://api.twitter.com/1.1/statuses/home_timeline.json',
  token,
  secret,
  function (error, data, response){
    if (error) console.error(error);
    json = JSON.parse(data);
    tweets = JSON.stringify(json);

    for(var i = 0; i<json.length; i++)
      {
        var item = json[i];
        client.index({
          index: 'twitter',
          type: 'tweets',
          body: item
        }, function (error, response) {
          console.log(error);
          console.log('index response: ' + response);
        });
      }
});

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles,
      json: tweets[0]
    });
  var query = encodeURI(req.body.query);
});

//getting post query
router.post('/response', function (req, res) {
  res.render('response', { query: req.body.query});

  //searching twitter index for query
    client.search({
      index:'twitter',
      type: 'tweets',
      body: {
        query: {
          match: {
            text: req.body.query
          }
        }
      }
    }, function (error, response) {
      console.log(JSON.stringify(response));
    });
});

  var query = encodeURI(req.body.query);

});

router.get('/flush', function (req, res) {
  client.indices.flush({
    full: 1
  }, function (err, response) {
    console.log(response);
  });
});


