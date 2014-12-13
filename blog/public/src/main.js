/** @jsx React.DOM */
var React = require('react');
var page = require('page');
var qs = require('qs');
var _ = require('lodash');
var Promise = require('bluebird');

var Base = require('./layouts/base');
var errorPage = require('./pages/error');
var req = require('./common/req');
var constants = require('../../constants');
var {loadPageData} = require('../../common');


page('*', (ctx, next) => {
  ctx.query = ctx.querystring ? qs.parse(ctx.querystring) : {};
  next();
});

var Empty = React.createClass({
  render() {
    return null;
  }
});

var Main = React.createClass({
  getInitialState() {
    return {
      Page: Empty,
      props: {}
    };
  },

  setTitle(title) {
    document.title = constants.BLOG_TITLE + (title ? ` | ${title}` : '');
  },

  setupRoute(handler, path) {
    page(path, (ctx, next) => {
      loadPageData({
        ctx: ctx,
        handler: handler,
        loadFn: req
      })
      .then(props => {
        this.setTitle(handler.title(props));
        this.setState({
          Page: handler.Page,
          props: props
        });
      })
      .catch(e => {
        console.log(e, e.stack);
        next();
      });
    });
  },

  setupErrorPage() {
    page('*', ctx => {
      var {Page} = errorPage;
      this.setTitle(errorPage.title());
      this.setState({
        Page: Page,
        props: {}
      });
    });
  },

  componentWillMount() {
    _.forEach(require('./routes'), this.setupRoute);
    this.setupErrorPage();
    page();
  },

  render() {
    var {Page, props} = this.state;
    return (
      <Base><Page {...props}/></Base>
    );
  }
});

React.render(<Main/>, document.body);
