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

router.get('/*', (req, res, next) => {
  var ua = req.get('User-Agent').toLowerCase();
  // ie ~9 and bot
  if (/msie\s[6-9]|bot|crawler|baiduspider|80legs|ia_archiver|voyager|curl|wget|yahoo! slurp|mediapartners-google/.test(ua)) {
    return next();
  }
  res.render('index', { title: constants.BLOG_TITLE });
});

var load = (o) => {
  o.uri = constants.API_PATH + o.url;
  return rp(o).then(JSON.parse);
};

// server side rendering
setupRoutes = routes => {
  _.forEach(routes, (handler, k) => {
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
    })
  });

  // Object.keys(routes).forEach(k => {
  //   var page = routes[k];
  //   router.get(k, (req, res) => {
  //     var props = {ctx: req};
  //     Promise.all(Object.keys(page.resources).map(k => {
  //       var o = page.resources[k](req);
  //       o.uri = config.apipath + o.url;
  //       return rp(o).then(data => props[k] = JSON.parse(data));
  //     }))
  //     .then(() => {
  //       var title = page.title(props);
  //       var {Page} = page;
  //       res.render('server_index', {
  //         title: constants.BLOG_TITLE + (title ? ` | ${title}` : ''),
  //         result: React.renderToString(<Base><Page {...props}/></Base>)
  //       });
  //     })
  //     .catch(e => console.log(e.stack));
  //   });
  // });
};
setupRoutes(require('../public/src/routes'));

// error page
router.get('/*', (req, res) => {
  res.render('server_index', {
    title: constants.BLOG_TITLE + ' | ' + errorPage.title(),
    result: React.renderToString(<Base><errorPage.Page /></Base>)
  });
});

module.exports = router;
