express = require "express"
path = require "path"
favicon = require "static-favicon"
logger = require "morgan"
cookieParser = require "cookie-parser"
bodyParser = require "body-parser"
fibrous = require 'fibrous'
session = require 'express-session'
RedisStore = require('connect-redis')(session)
config = require 'config'

index = require "./routes/index"
api = require "./routes/api"

mongoose = require 'mongoose'
mongoose.connect config.mongoPath
app = express()

# view engine setup
app.set "views", path.join(__dirname, "views")
app.set "view engine", "jade"
app.use favicon()
app.use logger("dev")
app.use bodyParser.json()
app.use bodyParser.urlencoded()
app.use cookieParser()
app.use session
  secret: config.redisSecret
  store: new RedisStore
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
app.use express.static(path.join(__dirname, "public"))
app.use fibrous.middleware
app.use "/api", api
app.use "/", index


#/ catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next err


#/ error handlers

# development error handler
# will print stacktrace
if app.get("env") is "development"
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.render "error",
      message: err.message
      error: err


# production error handler
# no stacktraces leaked to user
app.use (err, req, res, next) ->
  res.status err.status or 500
  res.render "error",
    message: err.message
    error: {}


module.exports = app