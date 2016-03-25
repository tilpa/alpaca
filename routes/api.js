var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('congratulations: you reached the api');
});

router.post('/alpaca/new', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var alpacaName = req.body.alpacaname;
  var alpacaType = req.body.alpacatype;
  var alpacaSex = req.body.alpacasex;
  var alpacaDob = req.body.alpacadob;
  var alpacaStatus = req.body.alpacastatus;
  var alpacaColour = req.body.alpacacolour;

  // Set our collection
  var collection = db.get('alpaca');

  // Submit to the DB
  collection.insert({
      "name" : alpacaName,
      "type" : alpacaType,
      "sex" : alpacaSex,
      "dob" : alpacaDob,
      "status" : alpacaStatus,
      "colour" : alpacaColour,

  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("/alpacalist");
      }
  });
});

router.post('/alpaca/remove/:name', function(req, res) {
  var db = req.db;
  var name = req.params.name;

  var collection = db.get('alpaca');
  collection.remove({"name": name },
    function (err, doc) {
      if (err) {
        res.send("Not sending")
      }
      else {
        res.redirect("/alpacalist");
      }
    });
});


module.exports = router;
