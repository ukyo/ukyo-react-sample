var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var fibrous = require('fibrous');
var basicAuth = require("basic-auth-connect");
var config = require('config');
var index = require("./routes/index");
var api = require("./routes/api");

var mongoose = require('mongoose');
mongoose.connect(config.mongoPath);

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express["static"](path.join(__dirname, "public")));
app.use(fibrous.middleware);

['post', 'put', 'delete'].map(method => {
  app[method]('/*', basicAuth(config.username, config.password));
});
app.use("/api", api);
app.use("/", index);
app.use(function(req, res, next) {
  var err;
  err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
