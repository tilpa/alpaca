var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alpacas!' });
});

/* GET Alpacalist page. */
router.get('/alpacalist', function(req, res) {
    var db = req.db;
    var collection = db.get('alpaca');
    collection.find({},{},function(e,data){
        res.render('alpacalist', {
            title: 'Alpaca List',
            alpacalist: data
        });
    });
});

/* GET SINGLE AlpacaDescription page. */
router.get('/alpacadescription/:name/', function(req, res) {
    var db = req.db;
    var name = req.params.name;
    var collection = db.get('alpaca');
    collection.find({'name': name}, function(e,data){
        res.render('alpacadescription', {
            title: 'Alpaca Description',
            alpacalist: data
        });
    });
});

/* GET Test page. */
router.get('/test', function(req, res) {
    res.render('test', { title: 'Test' });
});

/* GET New Alpaca page. */
router.get('/newalpaca', function(req, res) {
    res.render('newalpaca', { title: 'Add New Alpaca' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
