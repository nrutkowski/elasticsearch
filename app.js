var express = require('express'),
  config = require('./config/config');

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

oauth.get(
  'https://api.twitter.com/1.1/search/tweets.json?q=%23OnlyAtTarget',
  token,
  secret,
  function (error, data, response){
    if (error) console.error(error);
    data = JSON.parse(data);
    console.log(JSON.stringify(data, 0, 2));
    //console.log(response);
});

var app = express();

require('./config/express')(app, config);

app.listen(config.port);



