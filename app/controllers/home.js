var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  console.log('hello');
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});

router.post('/response', function (req, res) {
  res.render('response', { query: req.body.query});
  console.log('POST!');
});

