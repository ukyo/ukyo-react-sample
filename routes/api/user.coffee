express = require 'express'
config = require 'config'
moment = require 'moment'
_ = require 'lodash'
User = require '../../models/user'

router = express.Router()

router.get '/', (req, res) ->
  res.send 'hello user'

router.get '/me', (req, res) ->
  res.send req.session.user

router.post '/signup', (req, res) ->
  user = new User req.body
  user.sync.save()
  req.session.user = user
  res.send user

router.post '/login', (req, res) ->
  return res.send req.session.user if req.session.user
  user = User.sync.findOne({name: req.params.name})
  throw new Error('not found') if !user
  req.session.user = user
  res.send user

router.get '/logout', (req, res) ->
  req.session.user = null
  res.send null

module.exports = router