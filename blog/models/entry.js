var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('lodash');
var constants = require('../constants');
var schema = new Schema({
  title: String,
  slug: {
    type: String,
    index: {unique: true}
  },
  body: String,
  tags: {
    type: [String],
    default: []
  },
  created: Date,
  updated: Date
});

schema.pre('save', function(next) {
  var now = new Date();
  this.updated = now;
  if (this.created == null) this.created = now;
  next();
});

module.exports = mongoose.model('Entry', schema);
