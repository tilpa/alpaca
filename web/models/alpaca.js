'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alpacaColours = [
  'White',
  'Beige',
  'Light Fawn',
  'Medium Fawn',
  'Dark Fawn',
  'Light Brown',
  'Medium Brown'
  'Dark Brown',
  'Bay Black',
  'True Black',
  'Light Silver Grey',
  'Medium Silver Grey',
  'Dark Silver Grey',
  'Light Rose Grey',
  'Medium Rose Grey',
  'Dark Rose Grey\/Roan'
]

const alpacaSchema = new Schema({
  name: String,
  birthday: Date,
  colourCode: Number,
  parents: [
    sire: {type: String, default: "unknown"},
    dame: {type: String, default: "unknown"}
  ]
});

var Alpaca = mongoose.model('Alpaca', alpacaSchema);

module.exports = Alpaca;
