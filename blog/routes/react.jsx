/** @jsx React.DOM */
var express = require('express');
var router = express.Router();
var React = require('react');
var routes = require('../public/src/routes');
var _ = require('lodash');
var rp = require('request-promise');
var Promise = require('bluebird');
var config = require('config');
var constants = require('../constants');
var errorPage = require('../public/src/pages/error');
var Base = require('../public/src/layouts/base');
var {loadPageData} = require('../common');

var load = (o) => {
  o.uri = o.url;
  return rp(o).then(JSON.parse);
};

// server side rendering
var setupRoute = (handler, k) => {
  router.get(k, (req, res, next) => {
    loadPageData({
      ctx: req,
      handler: handler,
      loadFn: load
    })
    .then(props => {
      var title = handler.title(props);
      var {Page} = handler;
      res.render('server_index', {
        title: constants.BLOG_TITLE + (title ? ` | ${title}` : ''),
        result: React.renderToString(<Base><Page {...props}/></Base>)
      });
    })
    .catch(next);
  });
};

_.forEach(require('../public/src/routes'), setupRoute);

// error page
router.get('/*', (req, res) => {
  res.render('server_index', {
    title: constants.BLOG_TITLE + ' | ' + errorPage.title(),
    result: React.renderToString(<Base><errorPage.Page /></Base>)
  });
});


module.exports = router;