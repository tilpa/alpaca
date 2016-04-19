/**
* @Author: nxtonic
* @Date:   2016-04-16T16:50:01+10:00
* @Last modified by:   nxtonic
* @Last modified time: 2016-04-18T18:38:37+10:00
*/

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Animal = require('./animal');

// define schema data structure
var herdSchema = new Schema({
  name: {type: String, unique: true, required: true},
  males: [
    {animal: {type: Schema.ObjectId, ref: 'Animal'}}],
  females: [
    {animal: {type: Schema.ObjectId, ref: 'Animal'}}]
});

// define schema methods
herdSchema.methods.getMales = function (cb) {
  return this.model('Herd').males;
};

// set schema options
herdSchema.set('minimize', false);
herdSchema.set('timestamps', true);
herdSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    var block = {
      _id: ret._id,
      name: ret.name,
      males: ret.males,
      females: ret.females
    }
    return block;
  }
});

// create model from schema
var Herd = mongoose.model('Herd', herdSchema);

// export model to application
module.exports = Herd;
