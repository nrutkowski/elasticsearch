var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');


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


router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  var query = encodeURI(req.body.query);
});

//getting post query
router.post('/response', function (req, res) {

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
        results = response;
        hits = results.hits.hits;
      if (hits.length > -1){
        for(var i = 0; i<hits.length; i++) {
          var result = hits[i];
        }
      }
      console.log(hits);
      res.render('response', { query: req.body.query, results: hits});
    });



});




// router.get('/flush', function (req, res) {
//   client.indices.flush({
//     full: 1
//   }, function (err, response) {
//     console.log(response);
//   });
// });


