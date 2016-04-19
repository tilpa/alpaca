var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Alpacas!'
  });
});

/* GET Alpacalist page. */
router.get('/alpacalist', function(req, res) {
  var db = req.db;
  var collection = db.find('alpaca');
  collection.find({}, {}, function(e, data) {
    res.render('alpacalist', {
      title: 'Alpaca List',
      alpacalist: data
    });
  });
});

/* GET Add relations page. */
router.get('/addrelations', function(req, res) {
  var db = req.db;
  var collection = db.get('alpaca');
  collection.find({}, {}, function(e, data) {
    res.render('addrelations', {
      title: 'Add Relations',
      alpacalist: data
    });
  });
});

router.get('/addprogeny', function(req, res) {
  var db = req.db;
  var collection = db.get('alpaca');
  collection.find({}, {}, function(e, data) {
    res.render('addprogeny', {
      title: 'Add Progeny',
      alpacalist: data
    });
  });
});

/* GET SINGLE AlpacaDescription page. */
router.get('/alpacadescription/:name/', function(req, res) {
  var db = req.db;
  var name = req.params.name;
  var collection = db.get('alpaca');
  collection.find({
    'name': name
  }, function(e, data) {
    res.render('alpacadescription', {
      title: 'Alpaca Description',
      alpacalist: data
    });
  });
});

/* GET Test page. */
router.get('/test', function(req, res) {
  res.render('test', {
    title: 'Test'
  });
});

/* GET New Alpaca page. */
router.get('/newalpaca', function(req, res) {
  res.render('newalpaca', {
    title: 'Add New Alpaca'
  });
});

module.exports = router;
