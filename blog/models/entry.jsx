var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var moment = require('moment');
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
  // date
  var now = new Date();
  this.updated = now;
  if (this.created == null) this.created = now;
  // tags
  var m = moment(this.created);
  this.tags = _.union([m.format('YYYY'), m.format('YYYY.MM'), m.format('YYYY.MM.DD')], this.tags);
  next();
});

schema.statics.paginate = require('./paginate');
console.log(schema.statics.paginate);
schema.statics.hello = console.log.bind(console, 'hello');

module.exports = mongoose.model('Entry', schema);
