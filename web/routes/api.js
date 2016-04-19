/**
* @Author: tilpa
* @Date:   2016-04-16T13:26:03+10:00
* @Last modified by:   nxtonic
* @Last modified time: 2016-04-19T01:57:02+10:00
*/

'use strict';

// create application router
var router = require('express').Router();

// import database models
const Herd = require('../models/herd');
const Animal = require('../models/animal');

// GET methods
router.get('/', function (req, res, next) {
  res.send({
    status: res.statusCode,
    response: 'Everything is AWESOME 😁 '
  });
});
router.get('/meta', function (req, res, next) {
  res.json({
    resources: router.stack
  });
});
router.get('/dev/test', function (req, res, next) {

  var dad = new Animal({
    name: 'Fred',
    gender: 'M'
  });

  var mum = new Animal({
    name: 'Sarah',
    gender: 'F'
  });

  var child = new Animal({
    name: 'Holly',
    gender: 'F',
    parents: {
      sire: dad,
      dam: mum
    }
  });

  Herd.findOne({name: "Norfolk's Finest"}, function (err, res) {
    if (err) return console.error(err);
    console.log(res);
  });

  dad.save(function () {
    mum.save(function () {
      child.save();
    });
  });

  res.redirect('/api/v1/animals');

});
router.get('/dev/animal/create', function (req, res, next) {

  var t = new Date('Aug 22, 1995');

  var animal = new Animal({
    name: 'Fred',
    dob: t,
    gender: 'M'
  });

  animal.save(function (err, animal) {
    if (err) return console.error(err);
  });

  Animal.find(function (err, animals) {
    if (err) return console.error(err);
    res.send(animals);
  });

});
router.get('/dev/herd/create', function (req, res, next) {
  var herd = new Herd({
    name: "Norfolk's Finest"
  });
  herd.save(function (err, herd) {
    if (err) return console.error(err);
  });
  Herd.find(function (err, herds) {
    if (err) return console.error(err);
    return res.send(herds);
  });
});
router.get('/dev/deleteAll', function (req, res, next) {
  req.db.db.dropDatabase();
  res.redirect('/api/v1/');
});
router.get('/animals', function (req, res, next) {
  Animal.find(function (err, animals) {
    if (err) return console.error(err);
    res.send(animals);
  });
});
router.get('/herds', function (req, res, next) {
  Herd.find(function (err, herds) {
    if (err) return console.error(err);
    res.send(herds);
  });
});

module.exports = router;
