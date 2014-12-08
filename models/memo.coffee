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
  createdAt: Date
  updatedAt: Date

schema.pre 'save', (next) ->
  now = new Date()
  @updatedAt = now
  @createdAt ?= now
  next()

module.exports = mongoose.model 'Memo', schema