mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
_ = require 'lodash'

User = require './user'
constants = require '../constants'

schema = new Schema
  title: String
  body: String
  scope:
    type: String
    defaule: constants.MEMO_SCOPE_PUBLIC
  user:
    type: ObjectId
    ref: 'User'

module.exports = mongoose.model 'Memo', schema