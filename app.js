var express = require('express'),
  config = require('./config/config');

// oauth.get(
//   'https://api.twitter.com/1.1/search/tweets.json?q=%23OnlyAtTarget',
//   token,
//   secret,
//   function (error, data, response){
//     if (error) console.error(error);
//     data = JSON.parse(data);
//     console.log(JSON.stringify(data, 0, 2));
//     //console.log(response);
// });


var app = express();

require('./config/express')(app, config);

app.listen(config.port);



