express = require 'express'
config = require 'config'
moment = require 'moment'
_ = require 'lodash'

Memo = require '../../models/memo'
User = require '../../models/user'
constants = require '../../constants'

router = express.Router()

router.get '/', (req, res) ->
  memos = Memo.find().populate('user').sync.exec()
  res.send memos

router.get '/:id', (req, res) ->
  try
    res.send Memo.findById(req.params.id).populate('user').sync.exec()
  catch e
    res.send {}

router.post '/', (req, res) ->
  memo = new Memo req.body
  memo.user = req.session.user._id
  memo.sync.save()
  res.send memo

router.put '/:id', (req, res) ->
  memo = Memo.sync.findById(req.params.id)
  memo.set(req.body)
  memo.sync.save()
  res.send memo

router.delete '/:id', (req, res) ->
  memo = Memo.sync.findById(req.params.id)
  memo.sync.remove()
  res.send null

module.exports = router