/** @jsx React.DOM */
var React = require('react');
// var AccountManager = require('./components/AccountManager');
// var Reflux = require('reflux');

var IndexPage = require('./pages/IndexPage');
var MemoPage = require('./pages/MemoPage');
var MemoEditPage = require('./pages/MemoEditPage');
var UserStore = require('./stores/UserStore');
// var UserPage = require('./pages/UserPage');


require('../styles/style.css');

var page = require('page');
var qs = require('qs');

page('*', (ctx, next) => {
  ctx.query = qs.parse(location.search.slice(1));
  next();
});

var render = (Page, ctx) => {
  React.render(React.createElement(Page, ctx), document.body);
};

var setupRoutes = (routes) => {
  Object.keys(routes).forEach(k => page(k, render.bind(null, routes[k])));
};

setupRoutes({
  '/': IndexPage,
  '/memos/:id': MemoPage,
  '/newmemo': MemoEditPage
});

page();
