mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
_ = require 'lodash'

schema = new Schema
  name:
    type: String
    trim: true
    index:
      unique: true
  password: String

module.exports = mongoose.model 'User', schema