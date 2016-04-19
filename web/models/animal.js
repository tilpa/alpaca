/**
* @Author: nxtonic
* @Date:   2016-04-16T16:50:01+10:00
* @Last modified by:   nxtonic
* @Last modified time: 2016-04-19T01:31:43+10:00
*/

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Herd = require('./herd');

// define schema data structure
var animalSchema = new Schema({
  name: {type: String, required: true},
  dob: {type: Date, required: true, default: Date.now},
  gender: {type: String, required: true},
  herd: {type: Schema.ObjectId, ref: 'Herd'},
  breed: {type: String},
  colour: {type: Number},
  inbreediness: {type: Number},
  parents: {
    sire: {
      type: Schema.ObjectId,
      ref: 'Animal'
    },
    dam: {
      type: Schema.ObjectId,
      ref: 'Animal'
    }
  },
  progeny: [
    {
      type: Schema.ObjectId,
      ref: 'Animal'
    }
  ]
});

// define schema methods
animalSchema.methods.getHerdMembers = function (cb) {
  return this.model('Animal').find({ herd: this.herd }, cb);
};

animalSchema.methods.getInbreeding = function (cb) {
  // TODO: getInbreeding formula.
};

// animalSchema.plugin(tree);

// set schema options
animalSchema.set('minimize', false);
animalSchema.set('timestamps', true);
animalSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    var block = {
      _id: ret._id,
      name: ret.name,
      gender: ret.gender,
      dob: ret.dob,
      herd: ret.herd,
      breed: ret.breed,
      colour: ret.colour,
      inbreediness: ret.inbreediness,
      parents: ret.parents,
      progeny: ret.progeny
    }
    return block;
  }
});

// create model from schema
var Animal = mongoose.model('Animal', animalSchema);

// export model to application
module.exports = Animal;
