mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
_ = require 'lodash'

schema = new Schema
  name: String
  password: String

module.exports = mongoose.model 'User', schema